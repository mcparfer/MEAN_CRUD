import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url = 'http://localhost:4000/api/department/'

  constructor(private http: HttpClient) { }

  getDepartment(): Observable<any> {
    return this.http.get(this.url)
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveDepartment(department: Department): Observable<any> {
    return this.http.post(this.url, department);
  }

  getOneDepartment(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editDepartment(id: string, department: any): Observable<any> {
    return this.http.put(this.url + id, department);
  }
  
}
