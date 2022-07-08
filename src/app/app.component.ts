import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {Info} from "../Info";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngCardGame';
  lobby = true;
  info!: Info;
 ngOnInit() {

 }

  onChanged(info:Info) {
   this.info = info;
    this.lobby=false;
  }
}
