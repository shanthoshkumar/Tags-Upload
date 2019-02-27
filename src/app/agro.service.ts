import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {HttpClient, HttpRequest ,HttpHeaders} from '@angular/common/http'
import * as Tx from 'ethereumjs-tx';
declare let require: any;
var Buffer = require('buffer/').Buffer

let AgroAbi = require('./contract.json');

@Injectable({
  providedIn: 'root'
})
export class AgroService {
  public privatekey;
  public publickey;
  public _web3;
  public Agro_contract;
  public Agro_contractaddress="0x11b01dd2ca9b46cc54635cb033a8bd79e77053cc";//new
  public details = [];
  // public Agro_contractaddress="0x277d3b86511a492d9341ec48b41c8789cd01e99d";//correct

  constructor(private http:HttpClient) {   
      this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));      
      this.Agro_contract =new this._web3.eth.Contract(AgroAbi,this.Agro_contractaddress,{
      gaslimit:3000000,
      })   
      this.current_id();
   }

   pri(pri){
     this.privatekey=pri;
     console.log(this.privatekey);
     
   }

   baseUrl:string = "http://10.10.0.42:3000/";
 
   apidata(){
     var headers = new Headers();
     headers.append('Access-Control-Allow-Origin' , ' request.getHeader("Origin")');
    headers.append("Access-Control-Allow-Credentials", "true");
     headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append("Access-Control-Allow-Headers","Content-Type:text/plain",),
     headers.append('Accept','application/json');
     headers.append('content-type','application/json');
     let options =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
     return this.http.get(this.baseUrl );
 }

   public async privatekey_by_address():Promise<string>{    
    var instance=this;
    return new Promise<string>((resolve, reject) => {
       var senderaddress = instance._web3.eth.accounts.privateKeyToAccount("0x"+instance.privatekey,'hex');
       instance.publickey = senderaddress['address'];
          resolve(senderaddress['address'])  
    })as Promise<string>;
    }

    public async getUserBalance(): Promise<string> {
      let instance = this;
      return new Promise((resolve, reject) => {
        instance._web3.eth.getBalance(this.publickey,function(err,result){
          if(err != null) {
            reject(err);
          }
          else{
            resolve(instance._web3.utils.fromWei(result,'ether'));
          }
        })
      }) as Promise<string>;
    }
    public async map(index): Promise<object>{
      let instance = this;
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.map(index).call(function(err,result) {           
            if(err != null) {
              reject(err);
            }
            else
            {
              resolve(result)
            }
          });
      }) as Promise<object>;
     }


     public async map1(tagId): Promise<object>{
      let instance = this;
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.map1(tagId).call(function(err,result) {           
            if(err != null) {
              reject(err);
            }
            else
            {
              resolve(result)
            }
          });
      }) as Promise<object>;
     }

     
     public async current_id(): Promise<number>{
      let instance = this;
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.read_tagId().call(function(err,result) {           
            if(err != null) {
              reject(err);
            }
            else
            {
              // alert('Count'+result.length)
              resolve(result.length)
            }
          });
      }) as Promise<number>;
     }

     public async read_tagId(): Promise<string[]>{
      let instance = this;
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.read_tagId().call(function(err,result) {           
            if(err != null) {
              reject(err);
            }
            else
            {
              resolve(result)
            }
          });
      }) as Promise<string[]>;
     }

     
     public async read_map(tagId): Promise<string[]>{
      let instance = this;
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.read_map(tagId).call(function(err,result) {           
            if(err != null) {
              reject(err);
            }
            else
            {
              resolve(result)
            }
          });
      }) as Promise<string[]>;
     }

     
     public async get_all(): Promise<string[]>{
      let instance = this;
      let time_array =[];
      return new Promise((resolve,reject)=>{
        instance.read_tagId().then(tags =>{
          tags.forEach(tag=>{
              instance.read_map(tag).then(result =>{
                let obj1={}
                obj1['time'] = result[1];
                time_array.push(obj1)
            })
          })
  
  })
  resolve(time_array)
      }) as Promise<string[]>;
     }

     public async index_id(): Promise<number[]>{
      let instance = this;
      let arr = [];
      return new Promise((resolve,reject)=>{
          instance.Agro_contract.methods.index_id().call(function(err,result) {
            if(err != null) {
              reject(err);
            }
            else
            {
              for(let i=1;i<=result;i++){
                arr.push(i);
              }
              resolve(arr)
            }
          });
      }) as Promise<number[]>;
     }
  
}
