import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss']
})
export class CardShopComponent implements OnInit {
  @Input()
  card:any;
  @Output() isBuyCard= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  buyCard = () => {
    this.isBuyCard.emit(this.card);  }
}
