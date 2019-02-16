import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  target: string;
  constructor(public navCtrl: NavController) {
    this.target = 'daily';
  }
  
  ngOnInit() {
    
  }
  public Nutrition = {
    "Calories": 1000,
    "Protein":100,
    "Vitamin A": 100,
    "Vitamin C": 20,
    "Vitamin E": 50,
    "Vitamin D": 70,
    "Zinc":3,
    "Iron":5,
    "Fat": 50
  }
  public lineChartData:Array<any> = [
    {data: [0.5, 1.4, 1.55, 0.76, 0.89, 0.95, 1.08], label: 'Actual Health Value'},
    {data: [1, 1, 1, 1, 1, 1, 1], label: 'Series B'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public lineChartOptions:any = {
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
  public lineChartColors:Array<any> = [
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
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  /*public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  */

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Calories', 'Protein', 'Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Zinc', 'Iron', 'Fat'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 66,45], label: 'Standard Value'},
    {data: [28, 48, 40, 19, 86, 27, 90, 77,80], label: 'Actual Value'}
  ];


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  

}
