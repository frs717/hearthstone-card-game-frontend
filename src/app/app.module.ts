import {Input, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormLobbyComponent } from './form-lobby/form-lobby.component';
import { FormInfoComponent } from './form-info/form-info.component';
import { BetweenFightComponent } from './between-fight/between-fight.component';
import { CardShopComponent } from './card-shop/card-shop.component';
import { InBattleComponent } from './in-battle/in-battle.component';
import { CardInventoryComponent } from './card-inventory/card-inventory.component';
import { CardOnTheFieldComponent } from './card-on-the-field/card-on-the-field.component';
import { CardInBattleComponent } from './card-in-battle/card-in-battle.component';
import { ImgHeartstoneComponent } from './img-heartstone/img-heartstone.component';
import { FormFinishedComponent } from './form-finished/form-finished.component';
import { ImgPersonComponent } from './img-person/img-person.component';
import { ImgCardComponent } from './img-card/img-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLobbyComponent,
    FormInfoComponent,
    BetweenFightComponent,
    CardShopComponent,
    InBattleComponent,
    CardInventoryComponent,
    CardOnTheFieldComponent,
    CardInBattleComponent,
    ImgHeartstoneComponent,
    FormFinishedComponent,
    ImgPersonComponent,
    ImgCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
