import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnalysisPage } from './analysis.page';
import { ChartsModule } from 'ng2-charts/ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: AnalysisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [AnalysisPage]
})
export class AnalysisPageModule {}
