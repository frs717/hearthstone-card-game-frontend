import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {Info} from "../Info";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

// export let stompClient: any;
// export let username: String;
// export let lobbyId: String;
// export let output:String;
// export let form: any;
// export let players = [];



// export function setForm(value: any) {
//   form = value;
// }
//
// export function setLobbyId(value: any) {
//   lobbyId = value;
// }
//
// export function setUsername(value: any) {
//   username = value;
// }
//
// export function setStompClient(value: any) {
//   stompClient = value;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'AngCardGame';
  lobby = true;
  info!: Info;
  username!: string;
  activeForm = 'lobby';

  stompClient!:any;

  @Output() outputInfo= new EventEmitter<any>();
  players: any;
  ngOnInit() {

  }

  onChanged(info: Info) {
    this.info = info;
    console.log(info)
    this.lobby = false;

    if(this.info.idGame || this.info.idGame===0){
      this.join()
    } else {
      this.create()
    }
  }

  formChanged(activeForm: any) {
    this.activeForm = activeForm;
  }

  onCreated = () =>{
    this.stompClient.subscribe('/user/queue/errors', this.onError);
    this.stompClient.subscribe('/user/queue/create', this.successfulCreated);

    this.stompClient.send("/app/lobby.create",
      {},
      JSON.stringify({username: this.username})
    )
    //connectingElement.classList.add('hidden');
  }

  successfulCreated = (payload:any) =>{
  let lobby = JSON.parse(payload.body);
  this.stompClient.subscribe('/topic/public/' + lobby.id, this.onMessageReceived);
  console.log('lobby: ' + payload.body);
  this.onMessageReceived(payload);
}

  create = () =>{
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    var socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.username = this.info.name;
    this.stompClient.connect({}, this.onCreated,  this.onConnectedError);
  }

  join = () => {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    //username = document.querySelector('#login').value.trim();
    //lobbyId = document.querySelector('#lobbyId').value.trim();
    // if (form.form.value.name != null && form.form.value.lobbyId != null) {

    var socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onJoined, this.onConnectedError);
    this.username = this.info.name;
    // }
  }

  onJoined = () => {
    this.stompClient.subscribe('/user/queue/errors', this.onError);
    this.stompClient.subscribe('/topic/public/' + this.info.idGame, this.onMessageReceived);
    this.stompClient.send("/app/lobby.join",
      {},
      JSON.stringify({username: this.username, lobbyId: this.info.idGame})
    )
    //connectingElement.classList.add('hidden');
  }

  onMessageReceived = (payload: any) =>{
    // let lobby = JSON.parse(payload.body);
    // let info = "";
    // //lobbyInfoLabel.textContent = 'lobby id: ' + lobby.id;
    // info += 'Lobby id: ' + lobby.id + '\n';
    // if (lobby.players.length > 0) {
    //   //lobbyPlayersInfoLabel.textContent = 'Players:';
    //   info += 'Players: \n';
    // }
    // //-------------------------------------------------
    // for (let i = 0; i < lobby.players.length; i++) {
    //   //lobbyPlayersInfoLabel.textContent += ' ' + lobby.players[i].username;
    //   info += lobby.players[i].username + '\n';
    // }

    let lobby = JSON.parse(payload.body);
    this.players = lobby.players;


  }

  onConnectedError=() =>{
    // connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    // connectingElement.style.color = 'red';
    alert("Connection error")
  }
  onError = (payload: any) => {
    console.log('Error: ' + payload.body);
    this.stompClient.disconnect();
    // stompClient = null;
  }

  leave=() =>{
    this.stompClient.disconnect();
    this.stompClient = null;
    // joiningLobbyForm.classList.remove('hidden');
    // creatingLobbyForm.classList.remove('hidden');
    // lobbyInfoForm.classList.add('hidden');
  }
}


//-----------------------------------------------------------------------



