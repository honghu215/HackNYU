import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashFlowModalPage } from './cash-flow-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CashFlowModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashFlowModalPage]
})
export class CashFlowModalPageModule {}
