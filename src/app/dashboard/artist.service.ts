import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistaInterface } from '../interface/artista-interface';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:4201/api/artistas'; // Replace with your API URL

  getArtists(page: number, pageSize: number): Observable<ArtistaInterface[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token_access')
    );
    return this.http.get<ArtistaInterface[]>(
      `${this.baseUrl}?page=${page}&pageSize=${pageSize}`,
      { headers: headers }
    );
  }

  getOneProduct(id: number): Observable<ArtistaInterface> {
    return this.http.get<ArtistaInterface>(`${this.baseUrl}/${id}`);
  }

  deleteArtist(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: headers,
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token_access')
    );
  }
}
