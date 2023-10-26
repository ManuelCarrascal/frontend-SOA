import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

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
        routerLink: ['/login'],
      },
    ];
  }
}
