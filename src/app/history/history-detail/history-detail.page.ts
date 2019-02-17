import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  itemId = null;
  item: any;
  nutrients: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    this.loadItem();
  }

  async loadItem() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();

    this.photoService.getItem(this.itemId).subscribe( res => {
      loading.dismiss();
      this.nutrients = res;
      console.log(JSON.stringify(this.nutrients));
      this.item = res;
      // this.nutrients = [
      //   { 'name': 'Calcium', 'value': res[0].value },
      //   { 'name': 'Copper', 'value': this.item[1].value },
      //   { 'name': 'Folic Acid', 'value': this.item[2].value },
      //   { 'name': 'Iron', 'value': this.item[3].value },
      //   { 'name': 'Magnesium', 'value': this.item[4].value },
      //   { 'name': 'Niacin', 'value': this.item[5].value },
      //   { 'name': 'Vitamin A', 'value': this.item[6].value },
      //   { 'name': 'Vitamin C', 'value': this.item[7].value },
      //   { 'name': 'Vitamin D', 'value': this.item[8].value },
      //   { 'name': 'Zinc', 'value': this.item[9].value }
      // ];
      console.log((this.nutrients));
    });
  }

}
