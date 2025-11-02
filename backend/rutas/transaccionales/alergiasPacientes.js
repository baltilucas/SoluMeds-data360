import express from "express";
import { db } from '../../db.js';

const router = express.Router();

const tabla = ["alergiapaciente", "Alergias del Paciente"];

router.get("/paciente/:idPaciente", async (req, res) => {
  const idPaciente = parseInt(req.params.idPaciente, 10);
  try {
    const [rows] = await db.execute(
      `SELECT * FROM ${tabla[0]} where idPaciente = ${idPaciente};`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.get("/alergia/:idAlergia", async (req, res) => {
  try {
    const idAlergia = parseInt(req.params.idAlergia, 10);
    const [rows] = await db.execute(`
      SELECT * FROM ${tabla[0]} where idAlergia = ${idAlergia};`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { idPaciente, idAlergia, idSeveridad, sintomas, fechaDiagnostico } =
      req.body;

    if (!idPaciente || !idAlergia || !idSeveridad) {
      return res.status(400).json({ message: "Falta un dato obligatorio" });
    }

    const sql = `INSERT INTO ${tabla[0]} (idPaciente, idAlergia, idSeveridad, sintomas, fechaDiagnostico) VALUES (?, ? ,?, ?, ?);`;

    await db.query(sql, [
      idPaciente,
      idAlergia,
      idSeveridad,
      sintomas,
      fechaDiagnostico,
    ]);

    return res.status(201).json({ message: `${tabla[1]} añadida al listado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error al añadir ${tabla[1]}` });
  }
});

router.delete("/:idPaciente/:idAlergia", async (req, res) => {
  try {
    const idAlergia = parseInt(req.params.idAlergia, 10);
    const idPaciente = parseInt(req.params.idPaciente);

    if (isNaN(idAlergia)) {
      return res.status(400).json({ message: "ID Alergia inválido" });
    }

    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID paciente inválido" });
    }

    const [result] = await db.execute(
      `DELETE FROM ${tabla[0]} WHERE idAlergia = ? and idPaciente = ?`,
      [idAlergia, idPaciente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alergia no encontrada" });
    }

    return res.status(200).json({ message: "Alergia eliminada correctamente" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Algo falló borrando la alergia" });
  }
});

router.put("/:idAlergia/:idPaciente", async (req, res) => {
  try {
    const idAlergia = parseInt(req.params.idAlergia, 10);
    const idPaciente = parseInt(req.params.idPaciente, 10);
    const body = req.body;

    if (isNaN(idAlergia)) {
      return res.status(400).json({ message: "ID de alergia inválido" });
    }

    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID de paciente inválido" });
    }

    const camposValidos = ["idSeveridad", "sintomas", "fechaDiagnostico"];
    const campos = Object.keys(body).filter((key) =>
      camposValidos.includes(key)
    );

    if (campos.length === 0) {
      return res
        .status(400)
        .json({ message: "No se enviaron campos válidos para actualizar" });
    }

    const setClause = campos.map((key) => `${key} = ?`).join(", ");
    const values = campos.map((key) => body[key]);
    values.push(idPaciente, idAlergia); // ambos para el WHERE

    const sql = `
      UPDATE ${tabla[0]}
      SET ${setClause}
      WHERE idPaciente = ? AND idAlergia = ?;
    `;

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message: `No se encontró la alergia del paciente para actualizar`,
        });
    }

    return res
      .status(200)
      .json({ message: `${tabla[1]} modificada correctamente` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error modificando la alergia del paciente" });
  }
});



export default router;
