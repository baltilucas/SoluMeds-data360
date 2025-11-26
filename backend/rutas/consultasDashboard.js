import express from "express";
import { db } from "../db.js";

const router = express.Router();

const endpoints = ["/alergias/top", "/sexo", "/edad","/usuarios"];

router.get("/", async (req, res) => {
  try {
    res.json(endpoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mal po" });
  }
});

router.get("/alergias/top", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT nombreAlergia, total
      FROM (
          SELECT a.nombreAlergia,
                 COUNT(ap.idPaciente) AS total,
                 ROW_NUMBER() OVER (ORDER BY COUNT(ap.idPaciente) DESC) AS rn
          FROM alergia a
          LEFT JOIN alergiapaciente ap ON a.idAlergia = ap.idAlergia
          GROUP BY a.idAlergia
      ) t
      WHERE rn <= 5

      UNION ALL

      SELECT 'Otro' AS nombreAlergia, SUM(total) AS total
      FROM (
          SELECT COUNT(ap.idPaciente) AS total,
                 ROW_NUMBER() OVER (ORDER BY COUNT(ap.idPaciente) DESC) AS rn
          FROM alergia a
          LEFT JOIN alergiapaciente ap ON a.idAlergia = ap.idAlergia
          GROUP BY a.idAlergia
      ) t
      WHERE rn > 5;
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo el top de alergias" });
  }
});

router.get("/sexo", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT sexo, COUNT(*) AS total 
      FROM paciente 
      GROUP BY sexo;
    `);

    const mapped = rows.map((r) => ({
      sexo:
        r.sexo === 1 ? "Masculino" : r.sexo === 0 ? "Femenino" : "Desconocido",
      total: r.total,
    }));

    res.json(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo sexo" });
  }
});

router.get("/edad", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
    CASE
        WHEN TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) BETWEEN 0 AND 12 THEN '0-12 (Niño)'
        WHEN TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) BETWEEN 13 AND 17 THEN '13-17 (Adolescente)'
        WHEN TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) BETWEEN 18 AND 29 THEN '18-29 (Joven adulto)'
        WHEN TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) BETWEEN 30 AND 59 THEN '30-59 (Adulto)'
        WHEN TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) >= 60 THEN '60+ (Adulto mayor)'
        ELSE 'Desconocido'
    END AS grupoEdad,
    COUNT(*) AS total
FROM paciente
GROUP BY grupoEdad
ORDER BY MIN(TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()));

    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo grupos de edad" });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT count(*) as usuarios from paciente;
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo el numero de pacientes;" });
  }
});

export default router;
