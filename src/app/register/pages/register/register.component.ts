import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nombre: string = '';
  nombreartistico: string = '';
  correo: string = '';
  contrasena: string = '';
  telefono: string = '';
  biografia: string = '';
  blockChars: RegExp = /^[^<>*!'`]+$/;
  public errors: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const artista = {
      nombre: this.nombre,
      nombreartistico: this.nombreartistico,
      correo: this.correo,
      contrasena: this.contrasena,
      telefono: this.telefono.replace(/\D/g, ''), // Esto eliminará todos los caracteres no numéricos
      biografia: this.biografia,
    };

    this.http.post('http://localhost:4201/api/register', artista).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errors = err.error.errors.reduce((acc: any, error: any) => {
          acc[error.path] = error.msg;
          return acc;
        }, {});
        setTimeout(() => {
          this.errors = {};
        }, 4000);
      },
    });
  }
}
