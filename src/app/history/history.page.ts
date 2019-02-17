import { PhotoService } from './../services/photo.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  items: any;
  isLoggedin = false;
  dbNutrients: AngularFireList<any>;
  itemCollections: AngularFirestoreCollection<any>;

  constructor(
    private auth: AuthService,
    private photoService: PhotoService
    ) { }

  ngOnInit() {
    this.photoService.getDailyItemCollections().subscribe( res => {
      this.items = res;
      console.log(JSON.stringify(res));
    }, error => {
      console.log(error);
    });
  }

}
