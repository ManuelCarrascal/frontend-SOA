import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { TokenInterface } from 'src/app/interface/token-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  authError = false;
  formError = false;

  correo: string | number = '';
  contrasena: string = '';
  blockChars: RegExp = /^[^<>*!'`]+$/;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private act: Router
  ) {}

  form = this.fb.group({
    correo: [''],
    contrasena: [''],
  });

  enviar() {
    this.form.controls.correo.setValidators([
      Validators.required,
      Validators.email,
    ]);
    this.form.controls.contrasena.setValidators([Validators.required]);

    this.form.controls.correo.updateValueAndValidity();
    this.form.controls.contrasena.updateValueAndValidity();

    if (this.form.valid) {
      this.auth.getToken(this.form.value).subscribe(
        (arg: TokenInterface) => {
          localStorage.setItem('token_access', arg.token);

          this.act.navigate(['dashboard']);
          this.authError = false;
        },
        (error) => {
          this.authError = true;
          setTimeout(() => (this.authError = false), 3000);
        }
      );
    } else {
      this.formError = true;
    }
  }
}
