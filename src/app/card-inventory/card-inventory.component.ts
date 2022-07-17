import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-inventory',
  templateUrl: './card-inventory.component.html',
  styleUrls: ['./card-inventory.component.scss']
})
export class CardInventoryComponent implements OnInit {
  @Input()
  cardI:any;
  @Output() onSellInvCard= new EventEmitter<any>();
  @Output() onPutInvCard= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  sellCard() {
    this.onSellInvCard.emit(this.cardI);
  }

  putCardInv() {
    this.onPutInvCard.emit(this.cardI);
  }
}
