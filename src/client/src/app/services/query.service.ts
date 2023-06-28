import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QueryService {
  url1 = 'http://localhost:4000/api/queries/query-one/'
  url2 = 'http://localhost:4000/api/queries/query-two/'
  url3 = 'http://localhost:4000/api/queries/query-three/'
  url4 = 'http://localhost:4000/api/queries/query-four/'

  constructor(private http: HttpClient) { }

  getQueryOne(): Observable<any> {
    return this.http.get(this.url1)
  }

  getQueryTwo(): Observable<any> {
    return this.http.get(this.url2)
  }

  getQueryThree(): Observable<any> {
    return this.http.get(this.url3)
  }

  getQueryFour(): Observable<any> {
    return this.http.get(this.url4)
  }
}