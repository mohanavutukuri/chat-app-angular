import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message$: BehaviorSubject<{fromId:number,message:string}> = new BehaviorSubject({} as {fromId:number,message:string});

  // socket = io('https://node-api-1wbx.onrender.com');
  socket = io('http://localhost:3000');
  constructor() { }

  public addToUsers(id:number){
    this.socket.emit('connection',id);
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
}
