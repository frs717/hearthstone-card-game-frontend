import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-between-fight',
  templateUrl: './between-fight.component.html',
  styleUrls: ['./between-fight.component.scss']
})
export class BetweenFightComponent implements OnInit {
  @Output() onFormChange= new EventEmitter<any>();
  @Output() onStart= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  startGame(){
    // this.isClickBtn.emit()
    this.onFormChange.emit("betweenGame")
    this.onStart.emit()
  }
}
