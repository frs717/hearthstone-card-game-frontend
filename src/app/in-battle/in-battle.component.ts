import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-in-battle',
  templateUrl: './in-battle.component.html',
  styleUrls: ['./in-battle.component.scss']
})
export class InBattleComponent implements OnInit {

  @Input()
  round:any = {
    playerCard: [],
    opponentCard: []
  };
  constructor() { }

  ngOnInit(): void {
  }

}
