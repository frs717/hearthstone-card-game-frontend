import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-in-battle',
  templateUrl: './card-in-battle.component.html',
  styleUrls: ['./card-in-battle.component.scss']
})
export class CardInBattleComponent implements OnInit {
  @Input()
  cardA:any;
  constructor() { }

  ngOnInit(): void {
  }

}
