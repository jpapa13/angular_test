import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SessionService } from './session.service';
declare var $:any;

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'configuraciones', loadChildren: () => 
    import('./pages/configuraciones/configuraciones.module').then(mod => mod.ConfiguracionesModule)
  },
  {path: 'componentes', loadChildren: () => 
  import('./pages/componentes/componentes.module').then(mod => mod.ComponentesModule)
},
  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router,private session:SessionService) {
    this.session.verificarSession();
    this.redireccionar();
  }
  private redireccionar()
  {
    this.router.events.subscribe((event:NavigationEnd) => {
      if(event.urlAfterRedirects!=undefined && event.urlAfterRedirects === '/login'){
        if(this.session.session_sigin){
          this.router.navigateByUrl("/componentes/dashboard");
        }       
      }else if(event.urlAfterRedirects!=undefined){
        if(!this.session.session_sigin){
          this.router.navigateByUrl("/login");
        }else{
          this.onload();
        }        
      }
    });
  }
  private onload()
  {
    $(window).resize(()=>{
      this.recalcularTamanio();
    });
    $(window).ready(()=>{
      this.recalcularTamanio();
      $('#menu2 .list-group-item.header-menu.link').unbind('click');
      $('#menu2 .list-group-item.header-menu.link').click(function(){
        if($(this).find(".fa-angle-down").hasClass('d-none')){
          $(this).find(".fa-angle-down").removeClass('d-none');
          $(this).find(".fa-angle-right").addClass('d-none');
          $(this).find("ul").first().slideDown();
        }else{
          $(this).find(".fa-angle-right").removeClass('d-none');
          $(this).find(".fa-angle-down").addClass('d-none');
          $(this).find("ul").first().slideUp();
        }
      });
    });
  }
  private recalcularTamanio()
  {
    if($(window).width<=500){
      $("#menu2 ul").first().css('height','auto');
      $("#contenido").first().css('height','auto');
    }else{
      $("#menu2 ul").first().height($(window).height()-130);
      $("#contenido").first().height($(window).height()-130);
    }
  }
}
