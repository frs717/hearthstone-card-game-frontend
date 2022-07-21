import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-in-battle',
  templateUrl: './in-battle.component.html',
  styleUrls: ['./in-battle.component.scss']
})
export class InBattleComponent implements OnInit {
  @Output() onFormChange = new EventEmitter<any>();
  @Input()
  player: any;
  @Input()
  round:any = {
    playerCard: [],
    opponentCard: []
  };
  constructor() { }

  ngOnInit(): void {
  }

}
