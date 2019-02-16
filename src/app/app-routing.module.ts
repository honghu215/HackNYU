import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'photo', loadChildren: './photo/photo.module#PhotoPageModule' },
  { path: 'reward', loadChildren: './reward/reward.module#RewardPageModule' },
  { path: 'records', loadChildren: './records/records.module#RecordsPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'analysis', loadChildren: './analysis/analysis.module#AnalysisPageModule' },
  { path: 'item-modal', loadChildren: './photo/item-modal/item-modal.module#ItemModalPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
