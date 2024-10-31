import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('http://localhost:3000/getdata');
  }

  saveData(formName: string, key: string, value: string): Observable<any> {
    return this.http.get(`http://localhost:3000/fillform/${formName}/${key}/${value}`)
  }
}
