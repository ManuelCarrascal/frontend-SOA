import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Artistas',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/dashboard/artistas'],
      },

      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
