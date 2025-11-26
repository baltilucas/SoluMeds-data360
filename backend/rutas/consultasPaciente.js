import express from "express";
import { db } from "../db.js";

const router = express.Router();

const endpoints = ["/medicamento/:idPaciente","/vacunas/:idVacunas", "/invervenciones/:idPaciente"];

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
    m.nombreMedicamento AS nombre,
    m.dosis,
    f.nombreFormato AS formato,
    dr.frecuencia,
    dr.horaInicio,
    pa.nombrePrincipio AS principioActivo,
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
JOIN principioActivo pa
    ON m.idPrincipio = pa.idPrincipio
WHERE r.idPaciente = ?
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


router.get("/vacunas/:idPaciente", async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const [rows] = await db.execute(
      `
SELECT 
    vp.fecha AS fecha,
    v.nombreVacuna AS nombre,
    vp.proveedor AS proveedor,
    vp.establecimiento AS sede,
    vp.dosis AS dosis
FROM vacunapaciente vp
JOIN vacuna v
    ON vp.idVacuna = v.idVacuna
WHERE vp.idPaciente = ?
ORDER BY vp.idPaciente, vp.fecha;

      `,
      [idPaciente]  // <--- parámetro
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo vacunas del paciente" });
  }
});

router.get("/invervenciones/:idPaciente", async (req, res) => {
  try {
    const { idPaciente } = req.params;

    const [rows] = await db.execute(
      `
SELECT 
    i.nombreIntervención AS Intervención,
    d.nombreDoctor AS Doctor,
    ip.fechaIntervencion AS Fecha,
    ip.horaIntervención AS Hora
FROM intervencionpaciente ip
JOIN intervencion i ON ip.idIntervencion = i.idIntervencion
JOIN doctor d ON ip.idDoctor = d.idDoctor
WHERE ip.idPaciente = ?;
      `,
      [idPaciente]  
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo intervenciones del paciente" });
  }
});


export default router;
