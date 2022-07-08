import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Info} from "../../Info";

@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
  @Input() info!: Info;
  @Output() isClickBtn= new EventEmitter<Info>();
  constructor() { }

  ngOnInit(): void {
  }

}
