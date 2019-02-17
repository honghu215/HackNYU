import { AuthService } from './../services/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface DailyDate {
  date: string;
  data: number[];
}
const standardNutrients = [1000, 100, 100, 20, 50, 70, 3, 5, 50];
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
  public barChartLabels: string[] = ['Protein', 'Calories', 'Zinc', 'Vitamin A', 'Vitamin D', 'Vitamin C', 'Vitamin E'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [120, 1400, 3, 1000, 15, 600, 10], label: 'Standard Value' },
    { data: [], label: 'Actual Value' }
  ];

  dbNutrition: AngularFireList<any>;
  allDaysNutrition = [];
  todayData: DailyDate;
  selectedDate: string;

  constructor(public navCtrl: NavController,
    private db: AngularFireDatabase,
    private auth: AuthService) {
    this.target = 'daily';

    for (let i = 0; i < this.allDaysNutrition.length; i++) {
      if (this.allDaysNutrition[i].date === this.selectedDate) {
        this.barChartData[1].data = this.allDaysNutrition[i].data;
      }
    }
  }

  ngOnInit() {
    const userId = this.auth.getUserId();
    const currDateTime = `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`;
    this.dbNutrition = this.db.list(userId);
    this.selectedDate = currDateTime;
    this.dbNutrition.valueChanges().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const currNutrients = res[i];
        const key = Object.keys(currNutrients)[0];
        const nutritionData = [currNutrients[key][0].value,
        currNutrients[key][1].value,
        currNutrients[key][2].value,
        currNutrients[key][3].value,
        currNutrients[key][4].value,
        currNutrients[key][5].value,
        currNutrients[key][6].value];
        this.todayData = {
          date: currNutrients[key]['updatedAt'],
          data: nutritionData
        };
        console.log(this.todayData);
        this.allDaysNutrition.push(this.todayData);
        if (currNutrients[key]['updatedAt'] === this.selectedDate) {
          this.barChartData[1].data = nutritionData;
        }
      }
    });
  }

  onChange() {
    let selectedDateData;
    for (let i = 0; i < this.allDaysNutrition.length; i++) {
      if (this.allDaysNutrition[i].date === this.selectedDate) {
        selectedDateData = this.allDaysNutrition[i];
      }
    }
    this.barChartData[1].data = selectedDateData.data;
    this.target = 'weekly';
    this.target = 'daily';
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
