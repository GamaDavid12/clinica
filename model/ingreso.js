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

metodos.crearIngreso = function (datoIngreso, callback) {
    ingreso = [
        datoIngreso.id_ingreso,
        datoIngreso.fecha_ingreso,
        datoIngreso.nro_habitacion,
        datoIngreso.nro_cama,
        datoIngreso.observaciones,
        datoIngreso.nro_historial_clinico,
        datoIngreso.matricula_medico,
    ];
    consulta =
        "INSERT INTO ingreso (id_ingreso, fecha_ingreso, nro_habitacion, nro_cama, observaciones, nro_historial_clinico, matricula_medico) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(consulta, insgreso, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un paciente con ese id de ingreso " + datoIngreso.id_ingreso,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "otro error desconocido",
                    detail: err.sqlMessage
                })
            }


        } else {
            callback(undefined, {
                message: "el ingreso " + datoIngreso.id_ingreso+ "se registro correctamente",
                detail: rows,
            })
        }
    });
}

metodos.getAll = function (callback) {
    consulta = "select * from ingreso";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados son: ",
                detail: resultados,
            });
        }
    });
}



module.exports = { metodos }