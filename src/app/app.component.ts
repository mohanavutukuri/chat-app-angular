import { Component } from '@angular/core';
import { ChatService } from './chat.service';

export interface user{
  id:number;
  name:string;
  age:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'chat-application';

  currId={} as {id:number,enable:boolean};
  newMessage={} as {fromId:number,toId:number,message:string};
  messageList: string[] = [];
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
    this.chatService.getNewMessage().subscribe((data:{fromId:number,message:string}) => {
      if(data.message!=null && data.message!='')
      this.messageList.push(data.message);
    })
  }
  getUserObjects(){
    this.UsersData=[]
    this.UsersIds.forEach(id=>{
      this.UsersData.push(this.chatService.getById(id));
    });
  }
  sendMessage() {
    // this.newMessage.toId=1;
    if(this.newMessage.message)
    this.chatService.sendMessage(this.newMessage);
    this.newMessage.message='';
    // this.newMessage = {} as {fromId:number,toId:number,message:string};
    this.newMessage.fromId=this.currId.id;
  }
}
