import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AgroService} from '../agro.service'
import { log } from 'util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public canshow:boolean;
  public account;
  constructor(private ag:AgroService,private router:Router) { }
  

  login(private_key){
  console.log("enter")
    var meta = this;
    meta.ag.pri(private_key)
    meta.router.navigate(["profile"]);
  }



  ngOnInit() {
  }

}
