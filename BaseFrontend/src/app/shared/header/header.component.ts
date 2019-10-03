import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public foto:string;
  constructor(
    private request:RequestService,
    private mensajes:MensajesService,
    private loader:LoaderService,
    private session:SessionService) 
  { 
    this.foto = require("../../../assets/images/G.png");
  }

  ngOnInit() {
  }
  salir()
  {
    this.loader.show();
    this.request.post('login/salir',{'id':8}).subscribe((response)=>{
      this.loader.hide();
      if(response.status){
        this.session.verificarSession();
      }else{
        this.mensajes.show('warning','Advertencia',response.data);
      }
    },(error)=>{
      this.loader.hide();
      this.mensajes.show('warning','Advertencia',error.data);
    });
  }
}
