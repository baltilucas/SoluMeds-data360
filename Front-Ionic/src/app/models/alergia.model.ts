export class Alergia {
  idPaciente: string;
  nombre_alergia: string;
  gravedad: string;
  comentarios: string;

  constructor(data: { idPaciente: string; nombre_alergia: string; gravedad: string; comentarios: string }) {
    this.idPaciente = data.idPaciente;
    this.nombre_alergia = data.nombre_alergia;
    this.gravedad = data.gravedad;
    this.comentarios = data.comentarios;
  }
}
