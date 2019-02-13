import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuPageModule',
    canActivate: [ IntroGuard ]
  },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  {
    path: '',
    redirectTo: 'menu/tracker',
    pathMatch: 'full'
  },
  { path: 'filter-popover', loadChildren: './pages/filter-popover/filter-popover.module#FilterPopoverPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
