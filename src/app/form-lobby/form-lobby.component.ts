import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Info} from "../../Info";

let stompClient: any;
let username: String;
let lobbyId: String;
let form: any;

@Component({
  selector: 'app-form-lobby',
  templateUrl: './form-lobby.component.html',
  styleUrls: ['./form-lobby.component.scss'],
})


export class FormLobbyComponent implements OnInit {
  @Output() isClickBtn = new EventEmitter<any>();
  tittle = 'Создать игру';
  flag = true;
//  stompClient: any;
  disabled = true;
  greetings: string[] = [];
  name!: string;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  form!: FormGroup;
  btnInEnabled = false;
  btnCreateEnabled = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      idGame: new FormControl(),
    })
    this.form.valueChanges.subscribe(x => {

      this.btnCreateEnabled = x.name;
      this.btnInEnabled = x.name && x.idGame;
    });

  }

  hiddenForm() {
    this.isClickBtn.emit(new Info(this.form.value.name, this.form.value.idGame));
  }

  create() {
    form = this;
    create();
  }

  join() {
    form = this;
    join();
  }
}

function create() {
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

function onCreated() {
  stompClient.subscribe('/user/queue/errors', onError);
  stompClient.subscribe('/user/queue/create', successfulCreated);

  stompClient.send("/app/lobby.create",
    {},
    JSON.stringify({username: username})
  )
  //connectingElement.classList.add('hidden');
}

function successfulCreated(payload: any) {
  let lobby = JSON.parse(payload.body);
  stompClient.subscribe('/topic/public/' + lobby.id, onMessageReceived);
  console.log('lobby: ' + payload.body);
  onMessageReceived(payload);
}

function join() {
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

function onJoined() {
  stompClient.subscribe('/user/queue/errors', onError);
  stompClient.subscribe('/topic/public/' + lobbyId, onMessageReceived);
  alert(username + ' ' + lobbyId);
  stompClient.send("/app/lobby.join",
    {},
    JSON.stringify({username: username, lobbyId: lobbyId})
  )
  //connectingElement.classList.add('hidden');
}

function onMessageReceived(payload: any) {
  let lobby = JSON.parse(payload.body);
  form.hiddenForm();
  let info = "";
  //lobbyInfoLabel.textContent = 'lobby id: ' + lobby.id;
  info += 'Lobby id: ' + lobby.id + '\n';
  if (lobby.players.length > 0) {
    //lobbyPlayersInfoLabel.textContent = 'Players:';
    info += 'Players: \n';
  }

  for (let i = 0; i < lobby.players.length; i++) {
    //lobbyPlayersInfoLabel.textContent += ' ' + lobby.players[i].username;
    info += lobby.players[i].username + '\n';
  }
  alert(info);
}

function onConnectedError(error: any) {
  // connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
  // connectingElement.style.color = 'red';
  alert("Connection error")
}

function onError(payload: any) {
  console.log('Error: ' + payload.body);
  stompClient.disconnect();
  // stompClient = null;
}
