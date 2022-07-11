import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {Info} from "../Info";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

export let stompClient: any;
export let username: String;
export let lobbyId: String;
export let output:String;
export let form: any;
export let players = [];



export function setForm(value: any) {
  form = value;
}

export function setLobbyId(value: any) {
  lobbyId = value;
}

export function setUsername(value: any) {
  username = value;
}

export function setStompClient(value: any) {
  stompClient = value;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'AngCardGame';
  lobby = true;
  info!: Info;
  activeForm = 'lobby';

  @Output() outputInfo= new EventEmitter<any>();
  ngOnInit() {

  }

  onChanged(info: Info) {
    this.info = info;
    console.log(info)
    this.lobby = false;
  }

  formChanged(activeForm: any) {
    this.activeForm = activeForm;
  }
}

export function create() {
  if (stompClient != null) {
    stompClient.disconnect();
  }
  if (form.form.value.name) {
    var socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    username = form.form.value.name;
    stompClient.connect({}, onCreated, onConnectedError);
  }

  // event.preventDefault();
}

export function onCreated() {
  stompClient.subscribe('/user/queue/errors', onError);
  stompClient.subscribe('/user/queue/create', successfulCreated);

  stompClient.send("/app/lobby.create",
    {},
    JSON.stringify({username: username})
  )
  //connectingElement.classList.add('hidden');
}

export function successfulCreated(payload: any) {
  let lobby = JSON.parse(payload.body);
  stompClient.subscribe('/topic/public/' + lobby.id, onMessageReceived);
  console.log('lobby: ' + payload.body);
  onMessageReceived(payload);
}

export function join() {
  if (stompClient != null) {
    stompClient.disconnect();
  }
  //username = document.querySelector('#login').value.trim();
  //lobbyId = document.querySelector('#lobbyId').value.trim();
  // if (form.form.value.name != null && form.form.value.lobbyId != null) {

  var socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onJoined, onConnectedError);
  username = form.form.value.name;
  lobbyId = form.form.value.idGame;
  // }
}

export function onJoined() {
  stompClient.subscribe('/user/queue/errors', onError);
  stompClient.subscribe('/topic/public/' + lobbyId, onMessageReceived);
  stompClient.send("/app/lobby.join",
    {},
    JSON.stringify({username: username, lobbyId: lobbyId})
  )
  //connectingElement.classList.add('hidden');
}
//-----------------------------------------------------------------------
 export function onMessageReceived(payload: any) {
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
   for (let i = 0; i < lobby.players.length; i++) {
     output = "игрок"+lobby.players[i].username+'\n';
   }


}

export function onConnectedError(error: any) {
  // connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
  // connectingElement.style.color = 'red';
  alert("Connection error")
}

export function onError(payload: any) {
  console.log('Error: ' + payload.body);
  stompClient.disconnect();
  // stompClient = null;
}

export  function  leave(){
  stompClient.disconnect();
  stompClient = null;
  // joiningLobbyForm.classList.remove('hidden');
  // creatingLobbyForm.classList.remove('hidden');
  // lobbyInfoForm.classList.add('hidden');
}
