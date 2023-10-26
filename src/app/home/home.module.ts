import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, HomeRoutingModule, ButtonModule],
})
export class HomeModule {}
