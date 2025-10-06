import express from 'express';
import { db } from '../db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT mr.*, r.idPaciente, r.fechaEmision
      FROM medicamentoReceta mr
      JOIN receta r ON mr.idReceta = r.idReceta
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener medicamentos de recetas' });
  }
});



export default router;