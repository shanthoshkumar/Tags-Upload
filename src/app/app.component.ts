import { Component } from '@angular/core';
import {AgroService} from './agro.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public id1;
  constructor() {
   

   }
  title = 'Ethereum';
 

  hide()
  {
        (document.getElementById('navbar') as HTMLInputElement).hidden=true;
  }
   change(){   
    (document.getElementById('navbar') as HTMLInputElement).hidden=false;
  }
  
  ngOnInit() 
  {  
    this.hide()
   }


}   
