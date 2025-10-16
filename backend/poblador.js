import { db } from './db.js';
import { faker } from '@faker-js/faker';



const limit = 10000;


let alergias = 0

while (alergias < 200){
    let lista = []


}



let alergiapaciente=0 



while (alergiapaciente < limit) {

    let idPaciente = 1
    let idAlergia = Math.random() * (10 - 1) + 1;
    let idSeveridad = Math.random() * 2 + 1

    try{ 
    const sql = `
      INSERT INTO alergiapaciente (idPaciente, idAlergia, idSeveridad, sintomas, fechaDiagnostico)
      VALUES (?, ?, ?, ?, CURDATE())
    `;

    await db.query(sql, [idPaciente, idAlergia, idSeveridad, 'cosa']);
}catch{
    console.log('Upsi uno malo')
}


alergiapaciente++;
}