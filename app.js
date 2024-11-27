import express, { json, urlencoded } from 'express';
const app = express();
import morgan from "morgan";
import medicoController from "./controller/medicoController.js";
import ingresoController from "./controller/ingresoController.js";
import pacienteController from "./controller/pacienteController.js";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");
import config from './config.json' assert { type: 'json' };

console.log(config.port); 



app.use("./medico", medicoController);

app.use("./paciente", pacienteController);

app.use("./ingreso", ingresoController);

app.listen(server.port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sevidor conectado en el puerto " + server.port);
    }
  });