import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss']
})
export class CardShopComponent implements OnInit {
  @Input()
  card:any;

  constructor() { }

  ngOnInit(): void {
  }

}
