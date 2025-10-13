import { db } from './db.js';

const limit = 10000;

let n=0 



while (n < limit) {

    let idPaciente = 1
    let idAlergia = Math.random() * (10 - 1) + 1;
    let idSeveridad = Math.random() * 2 + 1
    const sql = `
      INSERT INTO alergiapaciente (idPaciente, idAlergia, idSeveridad, sintomas, fechaDiagnostico)
      VALUES (?, ?, ?, ?, CURDATE())
    `;

    await db.query(sql, [idPaciente, idAlergia, idSeveridad, 'cosa']);


  n++;
}