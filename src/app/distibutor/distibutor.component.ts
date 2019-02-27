import { Component, OnInit } from '@angular/core';
import {AgroService} from '../agro.service'
import { AppComponent } from "../app.component";
@Component({
  selector: 'app-distibutor',
  templateUrl: './distibutor.component.html',
  styleUrls: ['./distibutor.component.css']
})
export class DistibutorComponent implements OnInit {

  constructor(private ag:AgroService){ 
    var ins = new AppComponent();
    ins.change();
  }

  ngOnInit() {
  }

}
