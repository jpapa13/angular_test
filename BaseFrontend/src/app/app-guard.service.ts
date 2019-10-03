import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { SessionService } from './session.service';

@Injectable()
export class AppGuardService{
  public permisos:any;
  constructor(private request:RequestService,private session:SessionService){
    if(this.session.permisos){
      this.permisos = JSON.parse(this.session.permisos);
    }else{
      this.cargarPermisos();
    }
  }
  public cargarPermisos()
  {
    this.request.get('login/permisos').subscribe((response)=>{
      this.permisos = [];
      response.data.forEach((element)=>{
        this.permisos.push(element.permiso_id);
      }); 
      localStorage.setItem('session_permisos',JSON.stringify(this.permisos));
    },(error)=>{
      this.permisos = [];
      localStorage.setItem('session_permisos',JSON.stringify([]));
    });
  }
  public tienePermisos(permiso_id:Number)
  {
    this.permisos.forEach((element) => {
      if(element==permiso_id){
        return true;
      }
    });
    return false;
  }
  
}