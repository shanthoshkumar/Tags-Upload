import { Component, OnInit } from '@angular/core';
import {AgroService} from '../agro.service'
import { Router } from "@angular/router";
import * as $ from 'jquery'
import { AppComponent } from "../app.component";
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
canshow;
  constructor(private ag:AgroService,private router:Router) {  
    var meta = this;
    meta.balance();
   }

  balance(){
    console.log("in")
    var meta = this;
    meta.ag.privatekey_by_address().then(acc=>{
      document.getElementById('address').innerText = acc; 
     })   
    meta.ag.getUserBalance().then(acc_balance=>{
      console.log(acc_balance);
      
     document.getElementById('address_acc_balance').innerText = acc_balance; 
    })
     
  }

  
  logout(){
    var meta = this;
    meta.ag.privatekey = "";
    meta.router.navigate(["signin"])
    var ins = new AppComponent();
    ins.hide();
  }

  toggleClicked(event: MouseEvent)
    {
        var target = event.srcElement.id;
        var body = $('body');
        var menu = $('#sidebar-menu');
        
        // toggle small or large menu
        if (body.hasClass('nav-md')) {
          console.log("1");
          
            menu.find('li.active ul').hide();
            menu.find('li.active').addClass('active-sm').removeClass('active');
        } else {

          console.log("2");
            menu.find('li.active-sm ul').show();
            menu.find('li.active-sm').addClass('active').removeClass('active-sm');
        }
        body.toggleClass('nav-md nav-sm');

        this.canshow = !this.canshow;
        // (document.getElementById('showtoggle') as HTMLElement).style.display = "block"

    }

 
 
    Clickevent(event: MouseEvent)
    {
        var target = event.srcElement.id;
        var body = $('body');
        var menu = $('#sidebar-menu');
        
        // toggle small or large menu
        if (body.hasClass('nav-sm')) {
          console.log("1");
          
            menu.find('li.active ul').hide();
            menu.find('li.active').addClass('active-sm').removeClass('active');
            body.toggleClass('nav-md nav-sm');
        } 
        // else {

        //   console.log("2");
        //     menu.find('li.active-sm ul').show();
        //     menu.find('li.active-sm').addClass('active').removeClass('active-sm');
        // }
     

        this.canshow = !this.canshow;
        // (document.getElementById('showtoggle') as HTMLElement).style.display = "block"

    } 
  ngOnInit() {

  }

}
