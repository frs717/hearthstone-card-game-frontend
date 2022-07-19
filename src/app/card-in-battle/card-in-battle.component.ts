import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-in-battle',
  templateUrl: './card-in-battle.component.html',
  styleUrls: ['./card-in-battle.component.scss']
})
export class CardInBattleComponent implements OnInit {
  @Input()
  card:any;
  @Output() onSellActiveCard= new EventEmitter<any>();
  @Output() onMoveLeftCard= new EventEmitter<any>();
  @Output() onMoveRightCard= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  sellActiveCard() {
    this.onSellActiveCard.emit(this.card);
  }

  moveCardLeft() {
    this.onMoveLeftCard.emit(this.card);
  }

  moveCardRight(){
    this.onMoveRightCard.emit(this.card);
  }
}
