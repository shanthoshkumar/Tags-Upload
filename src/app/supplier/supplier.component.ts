import { Component, OnInit } from '@angular/core';
import {AgroService} from '../agro.service'
import { AppComponent } from "../app.component";
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private ag:AgroService) { 
    var ins = new AppComponent();
    ins.change();
  }

  ngOnInit() {
  }

}
