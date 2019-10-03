import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PermisosComponent } from './permisos/permisos.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    PerfilesComponent,
    PermisosComponent
  ],
  imports: [
    ConfiguracionesRoutingModule,
    FormsModule
  ],
  providers: []
})
export class ConfiguracionesModule { }
