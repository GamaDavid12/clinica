const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');
require('rootpath')();


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
    consulta = "select * from paciente";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados es: ",
                detail: resultados,
            });
        }
    });
}

metodos.getPaciente = function (nro_ss, callback) {
    consulta = "select * from paciente where nro_ss = ?";
    connection.query(consulta, nro_ss, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un paceiente con el nro_ss:" + nro_ss)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta:",
                    detail: resultados,
                });
            }
        }

    });

}

metodos.getByNSS= function (nro_ss, callback) {
    consulta = "select * from paciente where nro_ss = ?";

    connection.query(consulta, nro_ss, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro paciente con el nro_ss:" + nro_ss)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con el nro_ss" + nro_ss,
                    detail: resultados,
                });
            }
        }

    });

}

metodos.crearMedico = function (datoPaciente, callback) {
    datoPaciente = [
        datoPaciente.nro_ss,
        datoPaciente.nombre,
        datoPaciente.apellido,
        datoPaciente.domicilio,
        datoPaciente.codigo_postal,
        datoPaciente.telefono,
        datoPaciente.nro_historial_clinico,
        datoPaciente.observaciones
    ];
    consulta =
        "INSERT INTO paciente (nro_ss, nombre, apellido, domicilio, codigo_postal, telefono, nro_historial_clinico, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(consulta, paciente, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un paciente con el nro_ss " + datoPaciente.nro_ss,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "otro error inesperado",
                    detail: err.sqlMessage
                })
            }


        } else {
            callback(undefined, {
                message: "el paciente " + datospaciente.nombre + " " + datospaciente.apellido + "se registro exitosamente",
                detail: rows,
            })
        }
    });
}

metodos.deletePaciente = function (nro_ss, callback) {
    query = "delete from paciente where nro_ss = ?";
    connection.query(query, nro_ss, function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro paciente " + nro_ss);
        } else {
            callback(undefined, "el paciente " + nro_ss + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = metodos