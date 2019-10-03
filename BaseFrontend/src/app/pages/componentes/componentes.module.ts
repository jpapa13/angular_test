import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentesRoutingModule } from './componentes-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ComponentesRoutingModule,
    FormsModule
  ],
  providers: []
})
export class ComponentesModule { }
