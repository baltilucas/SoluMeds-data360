import express from "express";
import { db } from "../../db.js";

const router = express.Router();

const tabla = ["detallereceta", "Detalle recetas"];

router.get("/receta/:idReceta", async (req, res) => {
  const idReceta = parseInt(req.params.idReceta, 10);
  try {
    const [rows] = await db.execute(
      `SELECT * FROM ${tabla[0]} where idReceta = ${idReceta};`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.get("/medicamento/:idMedicamento", async (req, res) => {
  try {
    const idMedicamento = parseInt(req.params.idMedicamento, 10);
    const [rows] = await db.execute(`
      SELECT * FROM ${tabla[0]} where idMedicamento = ${idMedicamento};`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.get("/:idReceta/:idMedicamento", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const idMedicamento = parseInt(req.params.idMedicamento, 10);

    const [rows] = await db.execute(`
      SELECT * FROM ${tabla[0]} where idMedicamento = ${idMedicamento} AND idReceta = ${idReceta};`);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      idReceta,
      idMedicamento,
      dias,
      frecuencia,
      horaInicio,
      comentario,
    } = req.body;

    if (!idReceta || !idMedicamento || !dias || !frecuencia || !horaInicio) {
      return res.status(400).json({ message: "Falta un dato obligatorio" });
    }

    const sql = `INSERT INTO ${tabla[0]} (idReceta, idMedicamento, dias, frecuencia, horaInicio, comentario) VALUES (?, ? ,?, ?, ?, ?);`;

    await db.query(sql, [
      idReceta,
      idMedicamento,
      dias,
      frecuencia,
      horaInicio,
      comentario,
    ]);

    return res.status(201).json({ message: `${tabla[1]} añadida al listado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error al añadir ${tabla[1]}` });
  }
});

router.delete("/:idReceta/:idMedicamento", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const idMedicamento = parseInt(req.params.idMedicamento);

    if (isNaN(idReceta)) {
      return res.status(400).json({ message: "ID receta inválido" });
    }

    if (isNaN(idMedicamento)) {
      return res.status(400).json({ message: "ID medicamento inválido" });
    }

    const [result] = await db.execute(
      `DELETE FROM ${tabla[0]} WHERE idReceta = ? and idMedicamento = ?`,
      [idReceta, idMedicamento]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "detalle de receta no encontrada" });
    }

    return res
      .status(200)
      .json({ message: "detalle de receta eliminada correctamente" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Algo falló borrando el detalle de receta" });
  }
});

router.put("/:idReceta/:idMedicamento", async (req, res) => {
  try {
    const idReceta = parseInt(req.params.idReceta, 10);
    const idMedicamento = parseInt(req.params.idMedicamento, 10);
    const body = req.body;

    if (isNaN(idReceta)) {
      return res.status(400).json({ message: "ID de receta inválido" });
    }

    if (isNaN(idMedicamento)) {
      return res.status(400).json({ message: "ID de medicamento inválido" });
    }

    const camposValidos = ["dias", "frecuencia", "horaInicio","comentario"];
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
    values.push(idMedicamento, idReceta); 

    const sql = `
      UPDATE ${tabla[0]}
      SET ${setClause}
      WHERE idMedicamento = ? AND idReceta = ?;
    `;

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró el detalle de receta del paciente para actualizar`,
      });
    }

    return res
      .status(200)
      .json({ message: `${tabla[1]} modificada correctamente` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error modificando el detalle de receta del paciente" });
  }
});

export default router;
