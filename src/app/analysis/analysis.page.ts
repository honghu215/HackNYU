import { AuthService } from './../services/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  target: string;

  public Nutrition = {
    'Calories': 1000,
    'Protein': 100,
    'Vitamin A': 100,
    'Vitamin C': 20,
    'Vitamin E': 50,
    'Vitamin D': 70,
    'Zinc': 3,
    'Iron': 5,
    'Fat': 50
  };

  public lineChartData: Array<any> = [
    { data: [0.5, 1.4, 1.55, 0.76, 0.89, 0.95, 1.08], label: 'Actual Health Value' },
    { data: [1, 1, 1, 1, 1, 1, 1], label: 'Series B' },
  ];
  public lineChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          min: 0,
          autoSkip: false
        }
      }]
    }
  };
  public lineChartColors: Array<any> = [
    { // blue
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(58,166,195,1)',
      pointBackgroundColor: '#bff707',
      pointBorderColor: '#bff707',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgb(251, 252, 184,1)',
      pointBackgroundColor: 'rgb(251, 252, 184,1)',
      pointBorderColor: 'rgb(251, 252, 184,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    /*{ // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    */
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Calories', 'Protein', 'Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Zinc', 'Iron', 'Fat'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 66, 45], label: 'Standard Value' },
    { data: [28, 48, 40, 19, 86, 27, 90, 77, 80], label: 'Actual Value' }
  ];

  dbNutrition: AngularFireList<any>;
  allNutrition = [];
  constructor(public navCtrl: NavController,
              private db: AngularFireDatabase,
              private auth: AuthService) {
    this.target = 'daily';
  }

  ngOnInit() {
    const userId = this.auth.getUserId();
    const currDateTime = `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`;
    console.log(currDateTime);
    this.dbNutrition = this.db.list(userId);
    // const ref = firebase.database().ref(userId);
    // ref.orderByChild('updatedAt').equalTo(currDateTime).once('value', snapshot => {
    //   console.log(`Get today's item: ${JSON.stringify(snapshot)}`);
    // });
    // this.getAllData().subscribe(res => {
    //   console.log(JSON.stringify(res));
    // }, error => {
    //   console.log(error);
    // });
    this.dbNutrition.valueChanges().subscribe( res => {
      // console.log(JSON.stringify(res));
      // res.forEach( item => {
      //   if (item != null || res !== undefined) {
      //     console.log(`All past days' nutritions: ${JSON.stringify(Object.keys(res))}`);
      //   }
      // });
      for (let i = 0; i < res.length; i++) {
        const currNutrients = res[i];
        const key = Object.keys(currNutrients)[0];
        console.log(res[i], key);
        console.log(currNutrients[key]);
        // console.log(`All past days' nutritions: ${Object.keys(res[i])}`);
      }
    });

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getAllData() {
    const userId = this.auth.getUserId();
    return this.db.list(userId).snapshotChanges().pipe(
      map(items => {
        return items.map(item => {
          const data = item.payload.val();
          const key = item.payload.key;
          return { key, data };
        });
      })
    );
  }

}
