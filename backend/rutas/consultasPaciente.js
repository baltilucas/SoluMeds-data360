import express from "express";
import { db } from "../db.js";

const router = express.Router();

const endpoints = ["/medicamento/:idPaciente",];

router.get("/", async (req, res) => {
  try {
    res.json(endpoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mal po" });
  }
});

router.get("/medicamento/:idPaciente", async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const [rows] = await db.execute(
      `
      SELECT 
    d.nombreDoctor,
    r.fecha AS fechaReceta,
    m.nombreMedicamento AS medicamento,
    m.dosis,
    f.nombreFormato AS formato,
    dr.frecuencia,
    dr.horaInicio,
    DATE_ADD(r.fecha, INTERVAL dr.dias DAY) AS finalReceta,
    DATEDIFF(DATE_ADD(r.fecha, INTERVAL dr.dias DAY), CURRENT_DATE) AS diasRestantes
FROM receta r
JOIN doctor d
    ON r.idDoctor = d.idDoctor
JOIN detallereceta dr 
    ON r.idReceta = dr.idReceta
JOIN medicamento m
    ON dr.idMedicamento = m.idMedicamento
JOIN formato f
    ON m.idFormato = f.idFormato
WHERE r.idPaciente = 1
  AND CURRENT_DATE <= DATE_ADD(r.fecha, INTERVAL dr.dias DAY);

      `,
      [idPaciente]  // <--- parámetro
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo medicamentos vigentes" });
  }
});



export default router;
