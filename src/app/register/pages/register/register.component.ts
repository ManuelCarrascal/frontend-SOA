import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string | number = '';
  nameArtistic: string | number = '';
  email: string | number = '';
  password: string | number = '';
  phone: string | undefined | number = '';
  blockChars: RegExp = /^[^<>*!'`]+$/;
  biography: string | number = '';
}
