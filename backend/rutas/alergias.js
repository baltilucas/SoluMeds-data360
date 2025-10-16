import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM alergia;`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error encontrando Alergias" });
  }
});

router.get("/:idAlergia", async (req, res) => {
  try {
    const idAlergia = req.params.idAlergia;
    const [rows] = await db.query(`
      SELECT * FROM alergia where idAlergia = ${idAlergia};`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error encontrando Alergias" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "Falta el nombre de la alergia" });
    }

    const sql = `INSERT INTO alergia(nombreAlergia) VALUE (?)`;

    await db.query(sql, [nombre]);

    return res
      .status(201)
      .json({ message: "Alergia Añadida al listado de alergias" });
  } catch {
    console.error(error);

    return res.status(500).json({ message: "Error al añadir alergia" });
  }
});

router.delete("/:idAlergia", async (req, res) => {
  try {
    const idAlergiaString = req.params.idAlergia;

    if (!idAlergiaString) {
      return res.status(400).json({ message: "Falta el id de la alergia" });
    }

    const idAlergia = parseInt(idAlergiaString, 10);
    if (isNaN(idAlergia)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [result] = await db.execute(
      "DELETE FROM alergia WHERE idAlergia = ?",
      [idAlergia]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Alergia no encontrada" });
    }

    return res.status(200).json({ message: "Alergia eliminada correctamente" });
  } catch (error) {
    console.error(error);

    if (error && error.code === "ER_ROW_IS_REFERENCED_2") {
      return res
        .status(409)
        .json({
          message:
            "La alergia que se intenta borrar tiene pacientes que la tienen",
        });
    }
    res.status(500).json({ message: "Algo falló borrando la alergia" });
  }
});

router.put("/idAlergia", async (req, res) => {
  try {
  } catch {}
});

export default router;
