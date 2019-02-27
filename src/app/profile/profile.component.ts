import { Component, OnInit,OnDestroy } from '@angular/core';
import {AgroService} from '../agro.service'
import { AppComponent } from "../app.component";
import Web3 from 'web3';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy  {
  public index=[];
  public indexid=[];
  public detailslist=[];
  public result=[];
  public _web3;
  public block_data;
  public id1;
  public current_count;
  public tag_array = [];
  public place_array = [];
  public time_array = [];
  arr;
  
  constructor(private ag:AgroService) { 
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));  
    var ins = new AppComponent();
    ins.change();
    this.balance();
    this.tags();
    this.sortlist(0);

    this.ag.current_id().then(a=>this.current_count = a)
    // this.get_all_data();
  }
  public total_id;
  public ids = [];
  public  obj ={}



  public async get_all_data(reference): Promise<number[]>{
    return new Promise((resolve,reject)=>{
  // var reference;
let arr =[];

  let instance = this; 
  // instance.ag.read_tagId().then(tags=>{
    // reference=tags[0]
    // tags.forEach(tag =>{
      let shorted_arr = [];
      instance.ag.read_map(reference).then(array =>{
        for(let x=0;x<length;x++){
          for(let y=0;y<length;y++){
            if(array[x]>array[y])
            {}
          }
        }
        // let j=0;
        // do{
        //   if(array[1]>shorted_arr[j]){
        //     shorted_arr.push(array[1]);
        //   }
        //   j++;
        // }while(shorted_arr.length>j);
        
        
        let kanna:any = array[1];
 let temp = kanna.sort()

        temp.forEach(index=>{
          let t:any = index.toString()
          let tim:any = new Date(t*1000);
          arr.push(tim)
      //  console.log(tim);
       
        })
        resolve(arr)
// for(var kanna=0;kanna<array[1].length;kanna++)
// {
//   console.log(array[1][kanna])
//   this.arr.push(array[1][kanna])
//   if(array[kanna] > array[kanna+1])
//   {

//   }
// }
  // })
    })
})as Promise<number[]>;
  }


  
  public async convert(input_tag): Promise<string[]>{
    let instance = this;
    return new Promise((resolve,reject)=>{
    instance.ag.read_map(input_tag).then(result=>{
// console.log(result);
      let arr =[];
      let xs:any=result[1]
      xs.sort((a,b)=>b-a); // Ascending sort
        xs.forEach(i=>{

          let t:any =i.toString()
          let time:any = new Date(t*1000);
          arr.push(time)
        })
        resolve(arr)
    })
    }) as Promise<string[]>;
   }



  data(){
    let obj ={};
    obj['ids'] = this.total_id;
    this.ids.push(obj);
  }

  tags(){
    let meta =this;

    meta.ag.read_tagId().then(tags=>{
      tags.forEach(tag => {        
          let obj={}
          var tmp = this._web3.utils.toAscii(tag);
          var bank_name="";
          for(var i=0;i<32;i++){
            if((tmp[i]==" ")||(tmp[i]>="a" &&tmp[i]<="z")||(tmp[i]>="A" && tmp[i]<="Z")||(tmp[i]>=0))
            bank_name = bank_name+tmp[i];
          }
          obj['indexid']=bank_name;
          this.indexid.push(obj);
        
      })    
    })
  }

// sortlist(tagname){
//     this.detailslist.length=0;
//     let  meta =this;
//     if(tagname == 0){
//       meta.ag.read_tagId().then(tags =>{
//         for(let i=0;i<tags.length;i++)
//         {
//             let tmp;  
//               tmp = meta._web3.utils.toAscii(tags[i].toString());
//               var bank_name="";
//               for(let k=0;k<32;k++){
//                 if((tmp[k]==" ")||(tmp[k]>="a" &&tmp[k]<="z")||(tmp[k]>="A" && tmp[k]<="Z")||(tmp[k]>=0))
//                 bank_name = bank_name+tmp[k];
//               }
//               // console.log(bank_name);
//               let obj={}
//               obj['tags']=bank_name;
//           meta.ag.read_map(tags[i]).then(result=>{

//             for(let j=0;j<result[0].length;j++){
//               let t:any =result[1][j].toString()
//               let time:any = new Date(t*1000);
//               var tmp1 = meta._web3.utils.toAscii(result[0][j]);;
//                         var bank_name1="";
//                         for(var i=0;i<32;i++){
//                           if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z")||(tmp1[i]>=0))
//                           bank_name1 = bank_name1+tmp1[i];
//                         }
//               obj['place']=bank_name1;
//               obj['time']=time;
//               meta.detailslist.push(obj)
//               // console.log(meta.detailslist.length)
//             }
            
//           })
//         }
//       })
//     }
//     else
//     {
//       let tag = meta._web3.utils.fromAscii(tagname); 
//       meta.ag.read_map(tag).then(res =>{
//           for(let j=0;j<res[0].length;j++){
//             let t:any =res[1][j].toString()
//             let time:any = new Date(t*1000);
//             var tmp1 = meta._web3.utils.toAscii(res[0][j]);
//                       var bank_name1="";
//                       for(var i=0;i<32;i++){
//                         if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z")||(tmp1[i]>=0))
//                         bank_name1 = bank_name1+tmp1[i];
//                       }
//                       let obj ={};
//             obj['place']=bank_name1;
//             obj['time']=time;
//             obj['tags']=tagname;
//             meta.detailslist.push(obj)
//             // console.log(meta.detailslist.length)
//           }
//         })
//   }
  
// }
  
sortlist(tagname){

  this.detailslist.length=0;
  let  meta =this;
  if(tagname == 0){
    meta.ag.read_tagId().then(tags =>{
      for(let i=0;i<tags.length;i++)
      {
          let tmp;  
            tmp = meta._web3.utils.toAscii(tags[i].toString());
            var bank_name="";
            for(let k=0;k<32;k++){
              if((tmp[k]==" ")||(tmp[k]>="a" &&tmp[k]<="z")||(tmp[k]>="A" && tmp[k]<="Z")||(tmp[k]>=0))
              bank_name = bank_name+tmp[k];
            }
            // console.log(bank_name);
            let obj={}
            obj['tags']=bank_name;
        meta.ag.read_map(tags[i]).then(result=>{

          for(let j=0;j<result[0].length;j++){
            let t:any =result[1][j].toString()
            let time:any = new Date(t*1000);
            var tmp1 = meta._web3.utils.toAscii(result[0][j]);;
                      var bank_name1="";
                      for(var i=0;i<32;i++){
                        if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z")||(tmp1[i]>=0))
                        bank_name1 = bank_name1+tmp1[i];
                      }
            obj['place']=bank_name1;
            obj['time']=time;
            meta.detailslist.push(obj)
            // console.log(meta.detailslist.length)
          }
          
        })
      }
    })
  }
  else
  {
    let tag = meta._web3.utils.fromAscii(tagname); 
    meta.ag.read_map(tag).then(res =>{
      meta.convert(tag).then(array=>{

        let a=0;
        array.forEach(_time=>{      
          let obj ={};

          obj['time']=_time;

          
          var tmp1 = meta._web3.utils.toAscii(res[0][a]);
                    var bank_name1="";
                    for(var i=0;i<32;i++){
                      if((tmp1[i]==" ")||(tmp1[i]>="a" &&tmp1[i]<="z")||(tmp1[i]>="A" && tmp1[i]<="Z")||(tmp1[i]>=0))
                      bank_name1 = bank_name1+tmp1[i];
                    }
          obj['place']=bank_name1;
          obj['tags']=tagname;
          meta.detailslist.push(obj)
          a++;


        })

      })
      })
}

}




  balance(){
    // console.log("in")
    var meta = this;
    meta.ag.privatekey_by_address().then(acc=>{
      document.getElementById('address').innerText = acc; 
     })   
    meta.ag.getUserBalance().then(acc_balance=>{
      // console.log(acc_balance);
      
     document.getElementById('address_acc_balance').innerText = acc_balance; 
    })
     
  }
   
  table(){
      var id = document.getElementById("ids");
  }

  create()
  {
    alert('get...')
    let meta = this;
   meta._web3.eth.personal.newAccount('!@superpassword',function(err,res){
      console.log("Inside");
      
      if(err)
      {
        console.log(err);
        
      }
      else
      {
      console.log(res);
    }
      
    });
  }
  ngOnInit() 
  {
        let meta = this;
        meta.id1 = setInterval(function() {
          meta.ag.current_id().then(a=>{

          if(meta.current_count == a )
          {
            console.log('No update')
          }
          else{
            meta.sortlist(0)
          }

          })
        }, 2000);
     
  
}
       ngOnDestroy() {
           if (this.id1) { 
             clearInterval(this.id1);
             
           }
          
          
  }


}
