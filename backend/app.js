import express from 'express';
import { db } from './db.js';
import cors from 'cors';

import alergias from './rutas/alergias.js';
import alergiaspaciente from './rutas/pacienteAlergia.js';
import examenes from './rutas/examenes.js';
import medicamentos from './rutas/medicamentos.js';
import pacientes from './rutas/pacientes.js';
import principioActivo from './rutas/principioActivo.js';
import recetas from './rutas/recetas.js';
import tipoexamenes from './rutas/tipoExamenes.js';


import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 4000 || process.env.PORT_EXPRESS; 
const port_cors = 8100 || process.env.PORT_CORS; 




app.use(cors({
  origin: `http://localhost:${port_cors}`, 
  methods: ['GET', 'POST'],        
  allowedHeaders: ['Content-Type'] 
}));

app.use(express.json());

const endpoints = ['/alergias','/recetas','/medicamentos', '/pacientes', '/principioActivo', '/alergiaspaciente']

app.get('/', async (req, res) => {
  try {
    res.json(endpoints);
  }catch(error){
    console.error(error);
    res.status(500).json({message:'mal po'})
  }
})

app.use('/alergias', alergias);
app.use('/alergiaspaciente', alergiaspaciente);
app.use('/examenes', examenes);
app.use('/medicamentos', medicamentos);
app.use('/pacientes', pacientes);
app.use('/principioActivo', principioActivo);
app.use('/recetas', recetas);
app.use('/tipoexamenes', tipoexamenes);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
