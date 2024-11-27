const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');
const connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

var metodos = {}


    metodos.getAll = function (callback) {
        consulta = "select * from medico";
        connection.query(consulta, function (err, resultados) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        });
    }


metodos.getMedico = function (matricula, callback) {
    consulta = "select * from medico where matricula = ?";

    connection.query(consulta, matricula, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un medico con la matricula:" + matricula)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getByEspecialidad = function (especiliadad, callback) {
    consulta = "select * from medico where especialidad = ?";

    connection.query(consulta, especiliadad, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un medico con la especialidad:" + especiliadad)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con la especialidad" + especiliadad,
                    detail: resultados,
                });
            }
        }

    });

}

metodos.update = function (datosMedico, deTalMedico, callback) {

    datos = [
        datosMedico.matricula,
        datosMedico.nombre,
        datosMedico.apellido,
        datosMedico.especialidad,
        datosMedico.observaciones,
        parseInt(deTalMedico)
    ];
    consulta = "update medico set  matricula = ?, nombre = ?, apellido = ?, especialidad = ?, observaciones = ? WHERE matricula = ?";


    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntro un medico con la matricula el medico ${deTalMedico}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `el medico ${datosMedico.nombre} se actualizo correctamente`,
                    detail: rows,
                })
            }

        }
    });


}


metodos.crearMedico = function (datosMedico, callback) {
    medico = [
        datosMedico.matricula,
        datosMedico.nombre,
        datosMedico.apellido,
        datosMedico.especialidad,
        datosMedico.observaciones,
    ];
    consulta =
        "INSERT INTO medico (matricula, nombre, apellido, especialidad, observaciones) VALUES (?, ?, ?, ?, ?)";

    connection.query(consulta, medico, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un medico con la matricula " + datosMedico.matricula,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "otro error que no conocemos",
                    detail: err.sqlMessage
                })
            }


        } else {
            callback(undefined, {
                message: "el medico " + datosMedico.nombre + " " + datosMedico.apellido + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

 
metodos.deleteMedico = function (matricula, callback) {
    query = "delete from medico where matricula = ?";
    connection.query(query, matricula, function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un medico con la matricula " + matricula);
        } else {
            callback(undefined, "el medico " + matricula + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }