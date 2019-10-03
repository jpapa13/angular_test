import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public logo:string;
  constructor() { 
    this.logo = require("../../../assets/images/logo.png");
  }

  ngOnInit() {
  }
  public mostrarMenu()
  {
    $('#menu2').css('position','fixed');
    $('#menu2').css('top','0px');
    $('#menu2').css('bottom','0px');
    $('#menu2').css('width','290px');
    $('#menu2').show();
  }
  public ocultarMenu()
  {
    $('#menu2').hide();
    $('#menu2').css('position','inherit');    
  }
}
