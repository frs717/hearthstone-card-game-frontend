import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-form-lobby',
  templateUrl: './form-lobby.component.html',
  styleUrls: ['./form-lobby.component.scss'],
})

export class FormLobbyComponent implements OnInit {
  @Output() isClickBtn = new EventEmitter<void>();
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
    this.isClickBtn.emit();
  }
  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame:object) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/topic/public/test', function (hello: any) {
        _this.showGreeting(JSON.parse(hello.body).id);
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
}


