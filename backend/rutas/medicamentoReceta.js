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

router.get('/:idReceta', async (req, res) => {
  try {
    const { idReceta } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM medicamentoReceta WHERE idReceta = ?',
      [idReceta]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener medicamentos de la receta' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { idMedicamento, idReceta, dosis, frecuencia, duracion } = req.body;
    await db.query(
      'INSERT INTO medicamentoReceta (idMedicamento, idReceta, dosis, frecuencia, duracion) VALUES (?, ?, ?, ?, ?)',
      [idMedicamento, idReceta, dosis, frecuencia, duracion]
    );
    res.status(201).json({ message: 'Medicamento agregado a la receta' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar medicamento a la receta' });
  }
});


router.put('/', async (req, res) => {
  try {
    const { idMedicamento, idReceta, dosis, frecuencia, duracion } = req.body;
    await db.query(
      'UPDATE medicamentoReceta SET dosis = ?, frecuencia = ?, duracion = ? WHERE idMedicamento = ? AND idReceta = ?',
      [dosis, frecuencia, duracion, idMedicamento, idReceta]
    );
    res.json({ message: 'Medicamento actualizado en la receta' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar medicamento' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { idMedicamento, idReceta } = req.body;
    await db.query(
      'DELETE FROM medicamentoReceta WHERE idMedicamento = ? AND idReceta = ?',
      [idMedicamento, idReceta]
    );
    res.json({ message: 'Medicamento eliminado de la receta' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar medicamento' });
  }
});

export default router;
