import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  url = 'http://localhost:4000/api/project/'

  constructor(private http: HttpClient) { }

  getProject(): Observable<any> {
    return this.http.get(this.url)
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveProject(project: Project): Observable<any> {
    return this.http.post(this.url, project);
  }

  getOneProject(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editProject(id: string, project: any): Observable<any> {
    return this.http.put(this.url + id, project);
  }
}