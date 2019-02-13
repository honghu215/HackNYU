import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.page.html',
  styleUrls: ['./filter-popover.page.scss'],
})
export class FilterPopoverPage implements OnInit {

  categories = [
    { name: 'Vegetables', icon: 'nutrition' },
    { name: 'Drinks', icon: 'beer' },
    { name: 'Meat', icon: 'restaurant' },
    { name: 'Sports', icon: 'fitness' },
    { name: 'Education', icon: 'school' }
  ];

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  select(cat) {
    this.popoverCtrl.dismiss({selected: cat});
  }

}
