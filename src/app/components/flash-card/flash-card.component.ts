import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input() flipCard: boolean;

  constructor() { }

  ngOnInit() {
  }

}
