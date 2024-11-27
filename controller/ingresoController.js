const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ingresoBD = require("./../model/ingreso.js");

app.get("/", listar);
app.post('/create', crearIngreso);



function listar(req, res) {
    ingresoBD = ingresoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crearIngreso(req, res) {
    pacienteBD.metodos.crearIngreso(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}