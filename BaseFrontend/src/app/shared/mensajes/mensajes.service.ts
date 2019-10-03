import { Injectable } from '@angular/core';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public mensaje:string;
  public titulo:string;
  constructor() { }
  show(tipo:string,titulo:string,mensaje:string)
  {
    this.titulo = titulo;
    this.mensaje = mensaje;
    $('#mensaje_'+tipo).modal('show');
  }
  hide(tipo:string)
  {
    setTimeout(()=>{ $('#mensaje_'+tipo).modal('hide'); },1000);
  }
}
