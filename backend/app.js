import express from "express";
import { db } from "./db.js";
import cors from "cors";

import alergias from "./rutas/maestras/alergias.js";
import alergiaspaciente from "./rutas/transaccionales/alergiasPacientes.js";
import enfermedadesCronicas from "./rutas/maestras/enfermedadesCronicas.js";
import examenes from "./rutas/maestras/examenes.js";
import intervenciones from "./rutas/maestras/intervenciones.js";
import medicamentos from "./rutas/maestras/medicamentos.js";
import pacientes from "./rutas/maestras/pacientes.js";
import principioActivo from "./rutas/maestras/principioActivo.js";
import recetas from "./rutas/transaccionales/recetas.js";
import tipoexamenes from "./rutas/maestras/tipoExamenes.js";
import vacunas from "./rutas/maestras/vacunas.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 4000 || process.env.PORT_EXPRESS;
const port_cors = 8100 || process.env.PORT_CORS;

app.use(
  cors({
    origin: `http://localhost:${port_cors}`,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const endpoints = [
  "/alergias",
  "/alergiaspaciente",
  '/enfermedadescronicas',
  "/examenes",
  "/intervenciones",
  "/medicamentos",
  "/pacientes",
  "/principiosactivos",
  "/recetas",
  "/tipoexamenes",
  "/vacunas",
];

app.get("/", async (req, res) => {
  try {
    res.json(endpoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mal po" });
  }
});

app.use("/alergias", alergias);
app.use("/alergiaspaciente", alergiaspaciente);
app.use("/enfermedadescronicas", enfermedadesCronicas);
app.use("/examenes", examenes);
app.use("/intervenciones", intervenciones)
app.use("/medicamentos", medicamentos);
app.use("/pacientes", pacientes);
app.use("/principiosactivos", principioActivo);
app.use("/recetas", recetas);
app.use("/tipoexamenes", tipoexamenes);
app.use("/vacunas", vacunas);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
