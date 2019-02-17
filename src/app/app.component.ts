import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Take a Photo',
      url: '/photo',
      icon: 'camera'
    },
    {
      title: 'Analysis',
      url: '/analysis',
      icon: 'analytics'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'list'
    }
  ];

  isLoggedin = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.authService.authChange.subscribe( authStatus => {
      this.isLoggedin = authStatus;
    });
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.toggle();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
