import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from '../public/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { FooterComponent } from '../public/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CrudTableComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MenubarModule,
    ToastModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    TagModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule,
  ],
})
export class DashboardModule {}
