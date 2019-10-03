import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PermisosComponent } from './permisos/permisos.component';

const routes: Routes = [
  {path:'usuarios',component:UsuariosComponent},
  {path:'perfiles',component:PerfilesComponent},
  {path:'permisos',component:PermisosComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
