import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-inventory',
  templateUrl: './card-inventory.component.html',
  styleUrls: ['./card-inventory.component.scss']
})
export class CardInventoryComponent implements OnInit {
  @Input()
  cardI:any;
  constructor() { }

  ngOnInit(): void {
  }

}
