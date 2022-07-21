import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form-finished',
  templateUrl: './form-finished.component.html',
  styleUrls: ['./form-finished.component.scss']
})
export class FormFinishedComponent implements OnInit {
@Input()
isWin!:boolean;
  @Output() isClickLobbi = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  inLobbi() {
    this.isClickLobbi.emit();
  }
}
