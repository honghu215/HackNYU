import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  dbNutrients: AngularFireList<any>;
  itemCollections: AngularFirestoreCollection<any>;

  constructor() { }

  ngOnInit() {
  }

}
