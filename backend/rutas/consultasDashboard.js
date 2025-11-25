import express from "express";
import { db } from "../db.js";

const router = express.Router();



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

    const mapped = rows.map(r => ({
      sexo: r.sexo === 1 ? "Masculino" :
            r.sexo === 0 ? "Femenino" :
            "Desconocido",
      total: r.total
    }));

    res.json(mapped);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo sexo" });
  }
});



export default router;