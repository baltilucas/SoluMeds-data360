import express from "express";
import { db } from "../../db.js";

const router = express.Router();

const tabla = ["enfermedadcronica", "Enfermedad Cronica"];

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM ${tabla[0]};`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.get("/:idEnfermedadCronica", async (req, res) => {
  try {
    const idEnfermedadCronica = req.params.idEnfermedadCronica;
    const [rows] = await db.execute(
      `SELECT * FROM ${tabla[0]} WHERE idEnfermedadCronica = ?;`,
      [idEnfermedadCronica]
    );
    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombreEnfermedad } = req.body;

    if (!nombreEnfermedad) {
      return res.status(400).json({
        message: "Faltan campos obligatorios para ingresar (nombreEnfermedad)",
      });
    }

    const sql = `
  INSERT INTO ${tabla[0]} 
  (nombreEnfermedad)
  VALUES (?);
`;

    await db.query(sql, [nombreEnfermedad]);

    return res.status(201).json({ message: `${tabla[1]} añadida al listado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error al añadir ${tabla[1]}` });
  }
});

router.delete("/:idEnfermedadCronica", async (req, res) => {
  try {
    const idEnfermedadCronicaString = req.params.idEnfermedadCronica;

    const idEnfermedadCronica = parseInt(idEnfermedadCronicaString, 10);
    if (isNaN(idEnfermedadCronica)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [result] = await db.execute(
      `DELETE FROM ${tabla[0]} WHERE idEnfermedadCronica = ?`,
      [idEnfermedadCronica]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `${tabla[1]} no encontrada` });
    }

    return res
      .status(200)
      .json({ message: `${tabla[1]} eliminada correctamente` });
  } catch (error) {
    console.error(error);

    if (error && error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message: `El ${tabla[1]} que se intenta borrar tiene pacientes que la tienen`,
      });
    }
    res.status(500).json({ message: `Algo falló borrando el ${tabla[1]}` });
  }
});

router.put("/:idEnfermedadCronica", async (req, res) => {
  try {
    const idEnfermedadCronicaString = req.params.idEnfermedadCronica;
    const body = req.body;

    if (!idEnfermedadCronicaString) {
      return res.status(400).json({ message: `Falta el id del ${tabla[1]}` });
    }

    const idEnfermedadCronica = parseInt(idEnfermedadCronicaString, 10);
    if (isNaN(idEnfermedadCronica)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const camposValidos = ["nombreEnfermedad"];

    const campos = Object.keys(body).filter((key) =>
      camposValidos.includes(key)
    );

    if (campos.length === 0) {
      return res
        .status(400)
        .json({ message: `No se enviaron campos válidos para actualizar` });
    }

    const setClause = campos.map((key) => `${key} = ?`).join(", ");
    const values = campos.map((key) => body[key]);
    values.push(idEnfermedadCronica);

    const sql = `UPDATE ${tabla[0]} SET ${setClause} WHERE idEnfermedadCronica = ?;`;

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `${tabla[1]} no encontrado` });
    }

    return res
      .status(200)
      .json({ message: `${tabla[1]} modificado correctamente` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Error modificando el ${tabla[1]}` });
  }
});

export default router;
