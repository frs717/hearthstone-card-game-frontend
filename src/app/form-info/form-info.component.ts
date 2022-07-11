import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Info} from "../../Info";
import * as AppComp from "../app.component";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
  @Input() info!: Info;
  @Input() nameInfo: any;
  @Output() isClickBtn= new EventEmitter<any>();
  @Output() onFormChanged= new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {

  }
  leave(){
    AppComp.leave();
    // this.isClickBtn.emit()
    this.onFormChanged.emit("lobby")
  }
}
