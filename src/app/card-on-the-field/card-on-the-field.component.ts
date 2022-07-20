import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-on-the-field',
  templateUrl: './card-on-the-field.component.html',
  styleUrls: ['./card-on-the-field.component.scss']
})
export class CardOnTheFieldComponent implements OnInit {
  @Input()
  card:any;
  @Input()
  attackCard:any;
  @Input()
  defenceCard:any;
  constructor() { }

  ngOnInit(): void {
  }

}
