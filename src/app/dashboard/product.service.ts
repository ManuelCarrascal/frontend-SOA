import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoInterface } from '../interface/producto-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://api.escuelajs.co/api/v1/products';

  getProducts(): Observable<ProductoInterface[]> {
    return this.http.get<ProductoInterface[]>(this.baseUrl);
  }

  getOneProduct(id: number): Observable<ProductoInterface> {
    return this.http.get<ProductoInterface>(`${this.baseUrl}/${id}`);
  }
}
