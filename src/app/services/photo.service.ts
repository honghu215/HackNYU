import { NutrientItem } from './photo.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const nutritionixUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

export interface NutrientItem {
  url: string;
  nutrients: any;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // dbItems: AngularFireList<any>;
  dbNutrients: AngularFireList<any>;
  itemCollections: AngularFirestoreCollection<any>;
  visionItems = [];
  userId: string;
  dailyNutrients = [];

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private auth: AuthService,
    private http: HttpClient
  ) {
    const currDateTime = new Date();
    this.userId = window.localStorage.getItem('UserID');
    console.log(`User id: ${this.userId}`);
    const folderName = currDateTime.getFullYear() + '' + (currDateTime.getUTCMonth() + 1) + '' + currDateTime.getUTCDay();

    this.dbNutrients = db.list(`${this.userId}/${folderName}`);
    this.dbNutrients.valueChanges().subscribe(res => {
      this.dailyNutrients = res;
    });
    this.itemCollections = this.afs.collection<any>(`Nutritions/${this.userId}/${folderName}`);
  }

  getItemCollection() {
    return this.itemCollections;
  }

  getDailyNutrients() {
    return this.dbNutrients;
  }
  calculateNutrition(queryStr: string) {
    return this.http.post<any>(nutritionixUrl,
      { query: queryStr },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-app-id': environment['x-app-id'],
          'x-app-key': environment['x-app-key']
        }),
        responseType: 'json'
      });
  }

  async saveNutrients(url: string, fullNutrients) {
    const userId = this.auth.getUserId();
    const currDateTime = new Date();
    const folderName = currDateTime.getFullYear() + '' + (currDateTime.getUTCMonth() + 1) + '' + currDateTime.getUTCDay();

    this.dbNutrients = this.db.list(`${userId}/${folderName}`);
    this.itemCollections = this.afs.collection<any>(`Nutritions/${userId}/${folderName}`);
    // save to firestore
    this.itemCollections.add({
      url: url,
      ...fullNutrients
    });
    let newDaily = [];
    for (let i = 0; i < fullNutrients[0].length; i++) {
      const dbItemValue = (this.dailyNutrients.length === 0) ? 0 : this.dailyNutrients[0][i].value;
      newDaily.push({
        attr_id: fullNutrients[0][i].attr_id,
        value: fullNutrients[0][i].value + dbItemValue
      });
    }
    // update to database
    this.dbNutrients.remove().then( _ => console.log('DB emptied'));
    this.dbNutrients.push(newDaily);  }
}
