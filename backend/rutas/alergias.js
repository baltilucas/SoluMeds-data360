import express from 'express';
import { db } from '../db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM alergia;`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error encontrando Alergias' });
  }
});

router.get('/paciente/:idPaciente', async (req, res) => {
  try {
    const idPaciente = req.params.idPaciente
    const [rows] = await db.query(`
      SELECT * FROM alergiapaciente where idPaciente = ${idPaciente};`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error encontrando Alergias' });
  }
});


router.post('/paciente/:idPaciente', async (req, res)=> {
  try{
    const idPaciente = parseInt(req.params.idPaciente, 10);
    const { gravedad, idAlergia } = req.body;


    if (!idPaciente || !idAlergia || gravedad === undefined || gravedad === null) {
      return res.status(400).json({ message: 'Faltan datos requeridos: idAlergia y gravedad' });
    }

    const sintomas = '';

    const sql = `
      INSERT INTO alergiapaciente (idPaciente, idAlergia, idSeveridad, sintomas, fechaDiagnostico)
      VALUES (?, ?, ?, ?, CURDATE())
    `;

    await db.query(sql, [idPaciente, idAlergia, gravedad, sintomas]);

    return res.status(201).json({ message: 'Alergia añadida al paciente', idPaciente, idAlergia, idSeveridad: gravedad });
  }catch(error){
    console.error(error);

    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'La alergia ya está registrada para este paciente' });
    }
    return res.status(500).json({ message: 'Error al insertar alergia del paciente' });
  }
});

export default router;