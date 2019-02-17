import { Observable } from 'rxjs';
import { NutrientItem } from './photo.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
  afsItems: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.userId = window.localStorage.getItem('UserID');
    const currDateTime = new Date();
    const folderName = currDateTime.getFullYear() + '' + (currDateTime.getUTCMonth() + 1) + '' + currDateTime.getUTCDay();

    // this.dbNutrients = db.list(`${this.userId}/${folderName}`);
    // this.dbNutrients.valueChanges().subscribe(res => {
    //   this.dailyNutrients = res[0];
    //   console.log(this.dailyNutrients);
    // });
    this.itemCollections = this.afs.collection<any>(`${this.userId}`);
  }

  getItem(itemId) {
    const userId = this.auth.getUserId();
    this.itemCollections = this.afs.collection<any>(userId);
    return this.itemCollections.doc<any>(itemId).valueChanges();
  }

  getDailyItemCollections() {
    const userId = this.auth.getUserId();
    this.itemCollections = this.afs.collection<any>(userId);

    this.afsItems = this.itemCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return {
            id: id,
            ...data
          };
        });
      })
    );
    console.log(`Firestorage returned items: ${JSON.stringify(this.afsItems)}`);
    return this.afsItems;
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

  async saveNutrients(queryString: string, url: string, fullNutrients) {
    const userId = this.auth.getUserId();
    const currDateTime = new Date();
    const shortDate = `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`;
    console.log(currDateTime);
    const folderName = shortDate;
    this.dbNutrients = this.db.list(`${userId}/${folderName}`);
    this.dbNutrients.valueChanges().subscribe(res => {
      this.dailyNutrients = res[0];
      console.log(this.dailyNutrients);
    });
    this.itemCollections = this.afs.collection<any>(userId);
    // save to firestore
    this.itemCollections.add({
      url: url,
      name: queryString,
      addedAt: new Date().getTime(),
      ...fullNutrients[0]
    });
    let newDaily = [];
    for (let i = 0; i < fullNutrients[0].length; i++) {
      const dbItemValue = (this.dailyNutrients.length === 0) ? 0 : this.dailyNutrients[i].value;
      newDaily.push({
        attr_id: fullNutrients[0][i].attr_id,
        value: fullNutrients[0][i].value + dbItemValue
      });
    }
    // update to database
    this.dbNutrients.remove().then( _ => console.log('DB emptied'));
    this.dbNutrients.push({
      ...newDaily,
      updatedAt: shortDate
    });
  }
}
