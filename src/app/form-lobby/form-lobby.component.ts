import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-lobby',
  templateUrl: './form-lobby.component.html',
  styleUrls: ['./form-lobby.component.scss'],
})

export class FormLobbyComponent implements OnInit {
  @Output() isClickBtn= new EventEmitter<void>();
  tittle = 'Создать игру';
  flag = true;

  constructor() {
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
}


