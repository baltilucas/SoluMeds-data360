import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Alergia } from './models/alergia.model';

@Injectable({
  providedIn: 'root'
})

export class AlergiaService {
  private apiUrl = `${environment.apiUrl}/alergia`; 

  constructor(private http: HttpClient) {}

  
  crearAlergia(alergia: Alergia): Observable<Alergia> {
    return this.http.post<Alergia>(this.apiUrl, alergia);
  }

  obtenerAlergias(): Observable<Alergia[]> {
    return this.http.get<Alergia[]>(this.apiUrl);
  }

  obtenerAlergia(idPaciente: string): Observable<Alergia> {
    return this.http.get<Alergia>(`${this.apiUrl}/${idPaciente}`);
  }


  actualizarAlergia(idPaciente: string, alergia: Alergia): Observable<Alergia> {
    return this.http.put<Alergia>(`${this.apiUrl}/${idPaciente}`, alergia);
  }


  eliminarAlergia(idPaciente: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPaciente}`);
  }
}
