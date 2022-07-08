import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngCardGame';
  lobby = true;
 ngOnInit() {

 }

  onChanged() {
    this.lobby=false;
  }
}
