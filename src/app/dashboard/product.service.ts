import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://api.escuelajs.co/api/v1/products';

  getProducts(): Observable<any> {
    console.log(this.http.get(this.baseUrl));

    return this.http.get(this.baseUrl);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
