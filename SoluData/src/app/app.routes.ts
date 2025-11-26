import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'alergias',
    loadComponent: () => import('./alergias/alergias.page').then( m => m.AlergiasPage)
  },
  {
    path: 'examenes',
    loadComponent: () => import('./examenes/examenes.page').then( m => m.ExamenesPage)
  },
  {
    path: 'medicamentos',
    loadComponent: () => import('./medicamentos/medicamentos.page').then( m => m.MedicamentosPage)
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
    path: 'ingresaralergia',
    loadComponent: () => import('./ingresaralergia/ingresaralergia.page').then( m => m.IngresaralergiaPage)
  },
  {
    path: 'intervenciones',
    loadComponent: () => import('./intervenciones/intervenciones.page').then( m => m.IntervencionesPage)
  },
  {
    path: 'datospaciente',
    loadComponent: () => import('./datospaciente/datospaciente.page').then( m => m.DatospacientePage)
  },
];
