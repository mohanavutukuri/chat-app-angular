import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

export interface user{
  id:number;
  name:string;
  age:number;
}

export interface message{
  fromId:number;
  toId:number;
  message:string
}
export interface messagingList{
  receiverId:number;
  userMessages:message[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'chat-application';

  currId={} as {id:number,enable:boolean};
  newMessage={} as message;
  messageList: message[] = [];
  UsersIds:string[]=[];
  UsersData:user[]=[];
  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.currId.enable=false;
  }
  setReceiver(receiverId:any){
    this.newMessage.toId=receiverId;
  }
  registerUser(){
    this.chatService.addToUsers(this.currId.id);

    this.chatService.getNewUsers().subscribe((RevUsers:string[])=>{
      this.UsersIds=RevUsers.filter(data => this.currId.id.toString()!=data);
      this.getUserObjects();
    });

    this.currId.enable=true;
    this.newMessage.fromId=this.currId.id;

    this.chatService.getNewMessage().subscribe((data:message) => {
      if(data.message!=null && data.message!=''){
        this.messageList.push(data);
      }
    })
  }
  getUserObjects(){
    this.UsersData=[]
    this.UsersIds.forEach(id=>{
      this.UsersData.push(this.chatService.getById(id));
    });
  }
  sendMessage() {
    if(this.newMessage.message)
    this.chatService.sendMessage(this.newMessage);
    this.messageList.push(this.newMessage);
    let newMsg={} as message;
    newMsg.fromId=this.newMessage.fromId;
    newMsg.toId=this.newMessage.toId;
    this.newMessage=newMsg;
    this.newMessage.fromId=this.currId.id;
  }
}
