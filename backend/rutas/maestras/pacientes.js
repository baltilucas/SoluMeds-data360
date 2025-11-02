import express from "express";
import { db } from "../../db.js";

const router = express.Router();

const tabla = ["paciente", "Paciente"];

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM ${tabla[0]};`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.get("/:idPaciente", async (req, res) => {
  try {
    const idPaciente = parseInt(req.params.idPaciente, 10);

    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [rows] = await db.execute(
      `SELECT * FROM ${tabla[0]} WHERE idPaciente = ?;`,
      [idPaciente]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `${tabla[1]} no encontrado para ese paciente` });
    }

    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      nombre: nombrePaciente,
      rut,
      fechaNacimiento,
      sexo,
      direccion,
      telefono,
      idNacionalidad,
    } = req.body;

    if (!nombrePaciente || !rut || !sexo) {
      return res
        .status(400)
        .json({
          message:
            "Faltan campos obligatorios para ingresar (nombre, rut, sexo)",
        });
    }

    const sql = `
  INSERT INTO ${tabla[0]} 
  (nombrePaciente, rut, fechaNacimiento, sexo, direccion, telefono, idNacionalidad)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;

    await db.query(sql, [
      nombrePaciente,
      rut,
      fechaNacimiento,
      sexo,
      direccion,
      telefono,
      idNacionalidad,
    ]);

    return res.status(201).json({ message: `${tabla[1]} añadida al listado` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error al añadir ${tabla[1]}` });
  }
});

router.delete("/:idPaciente", async (req, res) => {
  try {
    const idPacienteString = req.params.idPaciente;

    const idPaciente = parseInt(idPacienteString, 10);
    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [result] = await db.execute(
      `DELETE FROM ${tabla[0]} WHERE idPaciente = ?`,
      [idPaciente]
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

router.put("/:idPaciente", async (req, res) => {
  try {
    const idPacienteString = req.params.idPaciente;
    const body = req.body;

    if (!idPacienteString) {
      return res.status(400).json({ message: `Falta el id del ${tabla[1]}` });
    }

    const idPaciente = parseInt(idPacienteString, 10);
    if (isNaN(idPaciente)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const camposValidos = [
      "nombrePaciente",
      "rut",
      "fechaNacimiento",
      "sexo",
      "direccion",
      "telefono",
      "idNacionalidad",
    ];

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
    values.push(idPaciente);

    const sql = `UPDATE ${tabla[0]} SET ${setClause} WHERE idPaciente = ?;`;

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

router.get("/rut/:rutPaciente", async (req, res) => {
  try {
    const rutPaciente = req.params.rutPaciente;

    const [rows] = await db.execute(
      `SELECT * FROM ${tabla[0]} WHERE rut = ?;`,
      [rutPaciente]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: `${tabla[1]} no encontrado` });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error encontrando ${tabla[1]}` });
  }
});

export default router;
