import {Input, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormLobbyComponent } from './form-lobby/form-lobby.component';
import { FormInfoComponent } from './form-info/form-info.component';
import { BetweenFightComponent } from './between-fight/between-fight.component';
import { CardShopComponent } from './card-shop/card-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLobbyComponent,
    FormInfoComponent,
    BetweenFightComponent,
    CardShopComponent,
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
