import express from "express";
import { db } from "../../db.js";

const router = express.Router();

const tabla = ["receta", "recetas del Paciente"];

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

router.get("/:idReceta", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const [rows] = await db.execute(`
      SELECT * FROM ${tabla[0]} where idReceta = ${idReceta};`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { idPaciente, fecha, idDoctor } = req.body;

    if (!idPaciente || !idDoctor) {
      return res.status(400).json({
        message: "Falta un dato obligatorio (idPaciente, idDoctor)",
      });
    }
    const sql = `
  INSERT INTO ${tabla[0]} 
  (idPaciente, fecha, idDoctor)
  VALUES (?, ? ,?);
`;
    await db.query(sql, [idPaciente, fecha, idDoctor]);

    return res.status(201).json({ message: `${tabla[1]} añadida al listado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error al añadir ${tabla[1]}` });
  }
});

router.delete("/:idReceta", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const idPaciente = parseInt(req.params.idPaciente);

    if (isNaN(idReceta)) {
      return res.status(400).json({ message: "ID receta inválido" });
    }

    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID paciente inválido" });
    }

    const [result] = await db.execute(
      `DELETE FROM ${tabla[0]} WHERE idReceta = ?;`,
      [idReceta, idPaciente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    return res.status(200).json({ message: "Receta eliminada correctamente" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Algo falló borrando la receta" });
  }
});

router.put("/:idReceta", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const body = req.body;

    if (isNaN(idReceta)) {
      return res.status(400).json({ message: "ID de receta inválido" });
    }

    const camposValidos = ["idPaciente", "fecha", "idDoctor"];
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
    values.push(idPaciente, idReceta); // ambos para el WHERE

    const sql = `
      UPDATE ${tabla[0]}
      SET ${setClause}
      WHERE idReceta = ?;
    `;

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
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
      .json({ message: "Error modificando la receta del paciente" });
  }
});

export default router;
