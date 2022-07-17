import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-between-fight',
  templateUrl: './between-fight.component.html',
  styleUrls: ['./between-fight.component.scss']
})
export class BetweenFightComponent implements OnInit {
  @Output() onFormChange = new EventEmitter<any>();
  @Output() onUpdateShop = new EventEmitter<any>();
  @Input()
  player: any;
  @Input()
  stompClient!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  //  startGame(){
  //    // this.isClickBtn.emit()
  // //   this.onFormChange.emit("betweenGame")
  //    this.onStart.emit()
  //  }
  updateShop(): void {
    this.onUpdateShop.emit();
  }

  buyCard(card: any) {
    let index = this.player.shop.cardList.indexOf(card);
    this.stompClient.send("/app/game.buyCard",
      {},
      index
    )
  }

  changeFreezeStatus() {
    this.stompClient.send("/app/game.changeFreezeShop",
      {},
    )
  }


  sellInvCard(card: any) {
    let index = this.player.invCards.indexOf(card);
    this.stompClient.send("/app/game.sellInventoryCard",
      {},
      index
    )
  }

  sellActiveCard(card: any) {
    let index = this.player.activeCards.indexOf(card);
    this.stompClient.send("/app/game.sellActiveCard",
      {},
      index
    )
  }

  putInvCard(card: any) {
    let index = this.player.invCards.indexOf(card);
    this.stompClient.send("/app/game.putCardToTable",
      {},
      index
    )
  }

  upgradeShop() {
    this.stompClient.send("/app/game.upgradeShop",
      {}
    )
  }

  moveCardLeft(card:any) {
    let index = this.player.activeCards.indexOf(card);
    this.stompClient.send("/app/game.moveCardLeft",
      {},
      index
    )
  }

  moveCardRight(card:any) {
    let index = this.player.activeCards.indexOf(card);
    this.stompClient.send("/app/game.moveCardRight",
      {},
      index
    )
  }
}
