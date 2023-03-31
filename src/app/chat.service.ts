import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  sampleUsers=[
    {
      id:1,
      name:"mohan",
      age:22
    },
    {
      id:2,
      name:"snehi",
      age:21
    },
    {
      id:3,
      name:"geetha",
      age:20
    }
  ]
  public message$: BehaviorSubject<{fromId:number,message:string}> = new BehaviorSubject({} as {fromId:number,message:string});
  public user$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  // socket = io('https://node-api-1wbx.onrender.com');
  socket = io('http://localhost:3000');
  constructor() { }

  public addToUsers=(id:number)=>{
    this.socket.emit('connection',id);
  }
  public getNewUsers=()=>{
    this.socket.on('connection',(RevUsers:string[])=>{
      this.user$.next(RevUsers);
    });
    return this.user$.asObservable();
  }
  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (data:{fromId:number,message:string}) =>{
      this.message$.next(data);
    });

    return this.message$.asObservable();
  };

  getById(id:any){
    let user:any={}
    this.sampleUsers.forEach(data=>{
      if(data.id==id){
        user=data;
      }
    })
    return user;
  }
}
