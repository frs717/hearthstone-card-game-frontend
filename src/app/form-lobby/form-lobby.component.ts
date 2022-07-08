import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Info} from "../../Info";

@Component({
  selector: 'app-form-lobby',
  templateUrl: './form-lobby.component.html',
  styleUrls: ['./form-lobby.component.scss'],
})

export class FormLobbyComponent implements OnInit {
  @Output() isClickBtn = new EventEmitter<any>();
  tittle = 'Создать игру';
  flag = true;
  stompClient: any;
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
  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame:object) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/topic/public/test', function (hello: any) {
       alert("hello")
      });
    });
  }

  showGreeting(message: string) {
    this.greetings.push(message);
  }

  sendName() {
    this.stompClient.send(
      '/app/test.test',
      {},
      JSON.stringify({'name':"nastyaaaaaaa"})
    );
  }
  // create(){
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }
  //   if (this.form.value.name) {
  //     var socket = new SockJS('/ws');
  //     this.stompClient = Stomp.over(socket);
  //     this.stompClient.connect({}, onCreated, onConnectedError);
  //   }
  //  // event.preventDefault();
  // }
  //
  //  onMessageReceived(payload:any) {
  //   let lobby = JSON.parse(payload.body);
  //   this.hiddenForm();
  //
  //   lobbyInfoLabel.textContent = 'lobby id: ' + lobby.id;
  //   if (lobby.players.length > 0) {
  //     lobbyPlayersInfoLabel.textContent = 'Players:';
  //   }
  //   for (let i = 0; i < lobby.players.length; i++) {
  //     lobbyPlayersInfoLabel.textContent += ' ' + lobby.players[i].username;
  //   }
  // }
  //
  //
  // successfulCreated(payload:any) {
  //   let lobby = JSON.parse(payload.body);
  //   this.stompClient.subscribe('/topic/public/' + lobby.id, onMessageReceived);
  //   console.log('!!!' + lobby.id);
  //   onMessageReceived(payload);
  // }
  //
  //  onCreated() {
  //   this.stompClient.subscribe('/user/queue/errors', onError);
  //   this.stompClient.subscribe('/user/queue/create',
  //
  //
  //   stompClient.send("/app/lobby.create",
  //     {},
  //     JSON.stringify({username: username, lobbyId: lobbyId})
  //   )
  //   connectingElement.classList.add('hidden');
  // }

}


