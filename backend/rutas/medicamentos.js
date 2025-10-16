import express from 'express';
import { db } from '../db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM medicamento;`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error encontrando medicamentos' });
  }
});




export default router;