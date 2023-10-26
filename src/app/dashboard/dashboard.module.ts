import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from '../public/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { CrudTableComponent } from './components/crud-table/crud-table.component';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, CrudTableComponent],
  imports: [CommonModule, DashboardRoutingModule, MenubarModule],
})
export class DashboardModule {}
