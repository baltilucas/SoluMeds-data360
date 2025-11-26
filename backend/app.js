import express from "express";
import { db } from "./db.js";
import cors from "cors";
import os from "os";

import alergias from "./rutas/maestras/alergias.js";
import alergiaspaciente from "./rutas/transaccionales/alergiasPacientes.js";
import detallereceta from "./rutas/transaccionales/detallesRecetas.js";
import enfermedadesCronicas from "./rutas/maestras/enfermedadesCronicas.js";
import examenes from "./rutas/maestras/examenes.js";
import intervenciones from "./rutas/maestras/intervenciones.js";
import medicamentos from "./rutas/maestras/medicamentos.js";
import pacientes from "./rutas/maestras/pacientes.js";
import principioActivo from "./rutas/maestras/principioActivo.js";
import recetas from "./rutas/transaccionales/recetas.js";
import tipoexamenes from "./rutas/maestras/tipoExamenes.js";
import vacunas from "./rutas/maestras/vacunas.js";
import textractRoutes from "./rutas/servicios/textract.js";
import consultasDashboard from "./rutas/consultasDashboard.js"
import consultasPaciente from "./rutas/consultasPaciente.js"

import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = 4000 || process.env.PORT_EXPRESS;
const port_cors = 8100 || process.env.PORT_CORS;

app.use(cors());

app.use(express.json());

const endpoints = [
  "/alergias",
  "/alergiaspaciente",
  "/detallesrecetas",
  '/enfermedadescronicas',
  "/examenes",
  "/intervenciones",
  "/medicamentos",
  "/pacientes",
  "/principiosactivos",
  "/recetas",
  "/tipoexamenes",
  "/vacunas",
  "/consultas"
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
app.use("/detallesrecetas", detallereceta);
app.use("/enfermedadescronicas", enfermedadesCronicas);
app.use("/examenes", examenes);
app.use("/intervenciones", intervenciones)
app.use("/medicamentos", medicamentos);
app.use("/pacientes", pacientes);
app.use("/principiosactivos", principioActivo);
app.use("/recetas", recetas);
app.use("/tipoexamenes", tipoexamenes);
app.use("/vacunas", vacunas);
app.use("/consultas", consultasDashboard)
app.use("/consultaspaciente", consultasPaciente);
app.use("/textract", textractRoutes);

function getPublicIP() {
  const ifaces = os.networkInterfaces();
  for (const iface of Object.values(ifaces)) {
    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
}

const publicIP = getPublicIP();

// Iniciar servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://${publicIP}:${port}`);
});