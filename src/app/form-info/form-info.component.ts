import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
  @Output() isClickBtn= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
