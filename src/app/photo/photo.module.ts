import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotoPage } from './photo.page';
import { ItemModalPage } from './item-modal/item-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotoPage, ItemModalPage],
  entryComponents: [ItemModalPage]
})
export class PhotoPageModule {}
