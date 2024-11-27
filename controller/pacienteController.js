const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pacienteBD = require("./../model/paciente.js");

//FUNCIONES UTILIZADAS EN ENDPOINTS 

app.get("/:nro_ss", getByNSS);
app.get("/", listar);
app.post('/create', crearpaciente);
app.get('/:nro_ss', obtenerpaciente);
app.delete("/:nro_ss", eliminarpaciente);




// FUNCIONES UTILIZADAS

function getByNSS(req, res) {
    nro_ss = req.params.nro_ss
    pacienteBD = pacienteBD.metodos.getByNSS(nro_ss, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}
function listar(req, res) {
   pacienteBD = pacienteBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crearpaciente(req, res) {
    pacienteBD.metodos.crearpaciente(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}

function obtenerpaciente(req, res) {
    let nro_ss = req.params.nro_ss;
    pacienteBD.metodos.getPaciente(nro_ss, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

function eliminarpaciente(req, res) {
    pacienteBD.metodos.deletePaciente(req.params.nro_ss, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}


module.exports = app;
