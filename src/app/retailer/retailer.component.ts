import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  constructor() { 
    var ins = new AppComponent();
    ins.change();
  }

  ngOnInit() {
  }

}
