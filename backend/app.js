import express from 'express';
import { db } from './db.js';
import cors from 'cors';
import medicamentoRecetaRoutes from './rutas/medicamentoReceta.js';
import alergias from './rutas/alergias.js'
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

const endpoints = ['/alergia']

app.get('/', async (req, res) => {
  try {
    res.json(endpoints);
  }catch(error){
    console.error(error);
    res.status(500).json({message:'mal po'})
  }
})

app.use('/medicamentoReceta', medicamentoRecetaRoutes);
app.use('/alergia', alergias)



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
