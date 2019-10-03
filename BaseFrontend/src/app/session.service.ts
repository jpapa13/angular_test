import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public session_sigin:boolean;
  public correo:string;
  public perfil_nombre:string;
  public permisos:string;
  public id:string;
  constructor(public request:RequestService,public router:Router) { 
    this.session_sigin=false;
  }
  public verificarSession():void
  {
    this.request.get('login/auth').subscribe((response)=>{
      if(response.status){
        this.session_sigin=true;
        this.correo = localStorage.getItem('session_correo');
        this.perfil_nombre = localStorage.getItem('session_perfil_nombre');
        this.id = localStorage.getItem('session_id');
        this.permisos = localStorage.getItem('session_permisos');
        this.router.navigateByUrl("/componentes/dashboard");
      }else{
        this.limpiarSesion();
      }
    },(error)=>{
      this.limpiarSesion();
    });
  }
  private limpiarSesion()
  {
    this.session_sigin=false;
    this.request.options.headers.set('Authorization', '');
    localStorage.removeItem('session_token');
    localStorage.removeItem('session_correo');
    localStorage.removeItem('session_perfil_nombre');
    localStorage.removeItem('session_id');
    localStorage.removeItem('session_permisos');
    this.router.navigateByUrl("/login");
  }
}
