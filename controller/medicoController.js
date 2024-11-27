import express, { json, urlencoded } from 'express';
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

import { metodos } from "./../model/medico.js";


app.get("/:especialidad", getByEspecialidad);
app.get("/", listar);
app.post('/create', crearMedico);
app.get('/:matricula', obtenerMedico);
app.delete("/:matricula", eliminarMedico);
app.put("/:matricula", modificarMedico);



// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------


function getByEspecialidad(req, res) {
    especialidad = req.params.especialidad
    medicos = metodos.getByEspecialidad(especialidad, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function listar(req, res) {
    medicos = metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crearMedico(req, res) {
    metodos.crearMedico(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obtenerMedico(req, res) {
    let matricula = req.params.matricula;
    metodos.getMedico(matricula, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}


function modificarMedico(req, res) {
    datosMedico = req.body;
    deEsteMedico = req.params.matricula;
    metodos.update(datosMedico, deEsteMedico, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) 
        }
    });
}


function eliminarMedico(req, res) {
    metodos.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}


export default app;
require("rootpath")();
