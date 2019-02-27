import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AgroService} from '../agro.service'
import { AppComponent } from "../app.component";
import Web3 from 'web3';
import { element } from 'protractor';
@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
public index=[];
public indexid=[];
public detailslist=[];
public _web3;
  constructor(private router:Router,private ag:AgroService) {
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));  
    var ins = new AppComponent();
    ins.change();
    // this.tags();
    console.log(ag.details)
  }

   tags(){
    var meta =this;
    // var temp = [];
    // let obj ={};
    // temp = meta.ag.details 
    // temp.forEach(element =>{
    //   obj['indexid']=element[0];
    //   this.indexid.push(obj);
    // })

    meta.ag.index_id().then(tags=>{
      tags.forEach(tag => {        
        meta.ag.map(tag).then(mp=>{
          let obj={}
          var tmp = this._web3.utils.toAscii(mp[0]);
          var bank_name="";
          for(var i=0;i<32;i++){
            if((tmp[i]==" ")||(tmp[i]>="a" &&tmp[i]<="z")||(tmp[i]>="A" && tmp[i]<="Z"))
            bank_name = bank_name+tmp[i];
          }
          obj['indexid']=bank_name;
          this.indexid.push(obj);
      });     
      })    
    })
  }

  sortlist(tagname){
    // console.log(this.ag.details[0][1]);
    
    this.detailslist.length=0;
    var  meta =this;
 if(tagname == 0){
    meta.ag.index_id().then(tags=>{
      tags.forEach(tag => {
        meta.ag.map(tag).then(res=>{
          
          
          var tmp = this._web3.utils.toAscii(res[0]);
          var bank_name="";
          for(var i=0;i<32;i++){
            if((tmp[i]==" ")||(tmp[i]>="a" &&tmp[i]<="z")||(tmp[i]>="A" && tmp[i]<="Z"))
            bank_name = bank_name+tmp[i];
          }
 
          var tmp1 = this._web3.utils.toAscii(res[1]);
          var bank_name1="";
          for(var i=0;i<32;i++){
            if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z"))
            bank_name1 = bank_name1+tmp1[i];
          }
          let obj={};
          obj['tags']=bank_name;
          obj['place']=bank_name1;
          var tm = new Date(res[2]*1000);
          obj['time']=tm.toString();
          this.detailslist.push(obj);
       });           
    })
 })
 }

 else{
   for(var i=0;i<this.ag.details.length;i++)
   {
        var tmp = this._web3.utils.toAscii(this.ag.details[i][0]);
        var _name="";
        for(var j=0;j<32;j++){
          if((tmp[j]==" ")||(tmp[j]>="a" &&tmp[j]<="z")||(tmp[j]>="A" && tmp[j]<="Z"))
          _name = _name+tmp[j];
        }
// alert(_name +''+tagname)
     if(_name == tagname)
     {
      let obj={};
        obj['tags']=_name;
         var tmp1 = this._web3.utils.toAscii(this.ag.details[i][1]);
        var b="";
        for(var k=0;k<32;k++){
          if((tmp1[k]==" ")||(tmp1[k]>="a" &&tmp1[k]<="z")||(tmp1[k]>="A" && tmp1[k]<="Z"))
         b = b+tmp1[k];
        }
        obj['place']=b;
        var tm = new Date(this.ag.details[i][2]*1000);
        obj['time']=tm.toString();
        this.detailslist.push(obj);
     }

    // console.log(this.ag.details[i][1]);
    
   }
  //  this.ag.details[]
        // var tmp = this._web3.utils.toAscii(res[0]);
        // var bank_name="";
        // for(var i=0;i<32;i++){
        //   if((tmp[i]==" ")||(tmp[i]>="a" &&tmp[i]<="z")||(tmp[i]>="A" && tmp[i]<="Z"))
        //   bank_name = bank_name+tmp[i];
        // }

        // var tmp1 = this._web3.utils.toAscii(res[1]);
        // var bank_name1="";
        // for(var i=0;i<32;i++){
        //   if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z"))
        //   bank_name1 = bank_name1+tmp1[i];
        // }
        // if(tagname == ban)
        //   let obj={};
        //   obj['tags']=bank_name;
        //   obj['place']=bank_name1;
        //   var tm = new Date(res[2]*1000);
        //   obj['time']=tm.toString();
        //   this.detailslist.push(obj);
  
   
      
  }
}
  ngOnInit() {
  }

}
