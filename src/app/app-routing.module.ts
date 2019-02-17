import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

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
  { path: 'photo', canActivate: [AuthGuard], loadChildren: './photo/photo.module#PhotoPageModule' },
  { path: 'reward', loadChildren: './reward/reward.module#RewardPageModule' },
  { path: 'history', canActivate: [AuthGuard], loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'analysis', canActivate: [AuthGuard], loadChildren: './analysis/analysis.module#AnalysisPageModule' },
  { path: 'item-modal', loadChildren: './photo/item-modal/item-modal.module#ItemModalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'reward', loadChildren: './reward/reward.module#RewardPageModule' },
  // tslint:disable-next-line:max-line-length
  { path: 'history-detail', canActivate: [AuthGuard], loadChildren: './history/history-detail/history-detail.module#HistoryDetailPageModule' },
  // tslint:disable-next-line:max-line-length
  { path: 'history-detail/:id', canActivate: [AuthGuard], loadChildren: './history/history-detail/history-detail.module#HistoryDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
