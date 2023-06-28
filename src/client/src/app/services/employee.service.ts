import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url = 'http://localhost:4000/api/employee/'

  // Iniciamos el servicio HttpClient con los métodos REST habituales (a continuación).
  constructor(private http: HttpClient) { }

  // Método que trae todos los empleados de la base de datos (GET).
  getEmployee(): Observable<any> {
    return this.http.get(this.url)
  }

  // Método que borra un empleado de la base de datos (DELETE).
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  // Método que guarda un nuevo empleado en la base de datos (POST).
  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.url, employee);
  }

  // Método que trae a un único empleado de la base de datos (GET).
  getOneEmployee(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  // Método que actualiza los datos de un empleado de la base de datos (PUT).
  editEmployee(id: string, employee: any): Observable<any> {
    return this.http.put(this.url + id, employee);
  }
}
