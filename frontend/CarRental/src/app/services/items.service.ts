import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  htpp: any;

  constructor(private http:  HttpClient) { }

  getItems(url: string ): Observable<object>{
    return this.http.get(url, httpOptions);
  }

  putItems(url:string, body: string): Observable<object>{
    return this.http.put(url, body, httpOptions);
  }

  postItems(url :string, body: string): Observable<object>{
    return this.http.post(url, body, httpOptions);
  }

  deleteItems(url: string): Observable<object>{
    return this.http.delete(url, {});
  }
}
