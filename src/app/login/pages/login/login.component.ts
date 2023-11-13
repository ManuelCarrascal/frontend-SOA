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

  email: string | number = '';
  password: string = '';
  blockChars: RegExp = /^[^<>*!'`]+$/;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private act: Router
  ) {}

  form = this.fb.group({
    email: [''],
    password: [''],
  });

  enviar() {
    this.form.controls.email.setValidators([
      Validators.required,
      Validators.email,
    ]);
    this.form.controls.password.setValidators([Validators.required]);

    this.form.controls.email.updateValueAndValidity();
    this.form.controls.password.updateValueAndValidity();

    if (this.form.valid) {
      this.auth.getToken(this.form.value).subscribe(
        (arg: TokenInterface) => {
          localStorage.setItem('token_access', arg.access_token);
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
