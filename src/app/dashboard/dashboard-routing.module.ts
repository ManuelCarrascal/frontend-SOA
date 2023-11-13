import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [authGuard], component: DashboardComponent },
  { path: 'artistas', canActivate: [authGuard], component: CrudTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
