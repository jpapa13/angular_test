import { Component, OnInit,OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestService } from '../../request.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AppGuardService } from 'src/app/app-guard.service';
import { HttpHeaders } from '@angular/common/http';
declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logo:string;
  public link:string;
  private fondo:string;
  public style:any;
  public usuario_valido:boolean;
  public correo:string;
  public contrasenia:string;

  constructor(
    private request:RequestService,
    private router:Router,
    private session:SessionService,
    private loader:LoaderService,
    private guard:AppGuardService
  ) { 
    this.logo = require("../../../assets/images/garantiapx.png");
    this.link = "https://www.garantia.mx/";
    this.fondo = require("../../../assets/images/montania-garantia.jpg");
    this.style = {"background-image": "url('"+this.fondo+"')"};
  }

  ngOnInit() {
    this.usuario_valido=true;
  }
  ngOnDestroy(){
  }

  public ingresar(formulario:NgForm):boolean{
    if(formulario.form!=undefined && formulario.form.status=='VALID'){
      let body = {
        'correo':formulario.form.controls.correo.value,
        'password':formulario.form.controls.contrasenia.value
      };
      this.loader.show();
      this.request.post('login/ingresar',body).subscribe((response)=>{
        this.loader.hide();
        if(response.status){
          
          this.request.options = {
            headers:new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+response.data.token
            })
          };
          localStorage.setItem('session_token',response.data.token);
          localStorage.setItem('session_correo',response.data.correo);
          localStorage.setItem('session_perfil_nombre',response.data.perfil_nombre);
          localStorage.setItem('session_id',response.data.id);
          this.guard.cargarPermisos();
          this.session.verificarSession();  
          this.usuario_valido=true;         
        }else{
          this.usuario_valido=false;
        }
      },(error)=>{
        this.loader.hide();
        this.usuario_valido=false;
      });
      return true;
    }else{
      return false;
    }
  }
  public limpiarErrores()
  {
    this.usuario_valido=true;
  }

}
