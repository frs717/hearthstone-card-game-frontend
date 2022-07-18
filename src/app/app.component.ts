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
  w:boolean=false;
  player:any;
  id:any;

  @Output() outputInfo= new EventEmitter<any>();
  players: any;
  ngOnInit() {

  }

  onChanged(info: Info) {
    this.info = info;
    console.log(info)
    this.lobby = false;

    if(this.info.idGame!=="none"){
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
    this.stompClient.subscribe('/user/queue/game/start',this.onGameStarted);
    this.stompClient.send("/app/lobby.create",
      {},
      JSON.stringify({username: this.username})
    )
    //connectingElement.classList.add('hidden');
  }

  onReturnBetweenFight=(payload:any)=>{
    this.activeForm = 'betweenFight';
    this.onUpdateShop(payload);
  }

  onGameStarted=(payload:any)=>{
    this.stompClient.subscribe('/user/queue/game/shop/update',this.onUpdateShop);// сюда покупку карты и тд. обновится карта и эта штукас срабоатет
    this.activeForm='betweenFight';
    this.player = JSON.parse(payload.body);
    this.stompClient.subscribe('/user/queue/game/round/start', this.onStartRound);
    this.stompClient.subscribe('/user/queue/game/shop/start',this.onReturnBetweenFight);
    this.stompClient.subscribe('/user/queue/game/round/update', this.onRoundUpdate);
  }

  onStartRound=()=>{
     this.activeForm = 'inBattle';
  }

  onRoundUpdate=()=>{
    alert('kkkk');
  }

  onUpdateShop=(payload:any) => {
    this.player = JSON.parse(payload.body);
  }

  successfulCreated = (payload:any) =>{
  let lobby = JSON.parse(payload.body);
  this.info.idGame = lobby.id;
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
    this.stompClient.subscribe('/user/queue/game/start',this.onGameStarted);
    this.stompClient.send("/app/lobby.join",
      {},
      JSON.stringify({username: this.username, lobbyId: this.info.idGame})
    )
  }

  onMessageReceived = (payload: any) =>{
    let lobby = JSON.parse(payload.body);
    this.players = lobby.users;
    this.id = lobby.id;
  }

  onConnectedError=() =>{
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
  }

  updateShop() {
    this.stompClient.send("/app/game.updateShop",
      {},
      JSON.stringify({username: this.username, lobbyId: this.info.idGame})
    )
  }
}


//-----------------------------------------------------------------------



