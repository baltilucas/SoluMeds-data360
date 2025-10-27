import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '',
    loadComponent: () => import('./datos-paciente/datos-paciente.page').then( m => m.DatosPacientePage)
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'datos-paciente',
    loadComponent: () => import('./datos-paciente/datos-paciente.page').then( m => m.DatosPacientePage)
  },
  {
    path: 'alergias',
    loadComponent: () => import('./alergias/alergias.page').then( m => m.AlergiasPage)
  },
  {
    path: 'medicamentos',
    loadComponent: () => import('./medicamentos/medicamentos.page').then( m => m.MedicamentosPage)
  },
  {
    path: 'calculadora-imc',
    loadComponent: () => import('./calculadora-imc/calculadora-imc.page').then( m => m.CalculadoraImcPage)
  },
  {
    path: 'clicker',
    loadComponent: () => import('./clicker/clicker.page').then( m => m.ClickerPage)
  },
  {
    path: 'intervenciones',
    loadComponent: () => import('./intervenciones/intervenciones.page').then( m => m.IntervencionesPage)
  },
  {
    path: 'vacunas',
    loadComponent: () => import('./vacunas/vacunas.page').then( m => m.VacunasPage)
  },
  {
    path: 'enfermedades',
    loadComponent: () => import('./enfermedades/enfermedades.page').then( m => m.EnfermedadesPage)
  },
  {
    path: 'datospersonales',
    loadComponent: () => import('./datospersonales/datospersonales.page').then( m => m.DatospersonalesPage)
  },
  {
    path: 'examenes',
    loadComponent: () => import('./examenes/examenes.page').then( m => m.ExamenesPage)
  },
  {
    path: 'contacto-emergencia',
    loadComponent: () => import('./contacto-emergencia/contacto-emergencia.page').then( m => m.ContactoEmergenciaPage)
  },
  {
    path: 'crearalergia',
    loadComponent: () => import('./crearalergia/crearalergia.page').then( m => m.CrearalergiaPage)
  },
  {
    path: 'creador-paciente',
    loadComponent: () => import('./creador-paciente/creador-paciente.page').then( m => m.CreadorPacientePage)
  }

];
