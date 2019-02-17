import { RewardPageModule } from './reward/reward.module';
import { PhotoPageModule } from './photo/photo.module';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPageModule } from './login/login.module';
import { SignupPageModule } from './signup/signup.module';
import { HomePageModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { File } from '@ionic-native/file/ngx';
import { ChartsModule } from 'ng2-charts';
import { HomePage } from './home/home.page';

import { HttpModule } from '@angular/http';
import { Data } from './providers/data';
import { FlashCardComponent } from './components/flash-card/flash-card.component';
import { EducationPage } from './education/education.page';
import { EducationPageModule } from './education/education.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent,
    // EducationPage
    // HomePage,
    // FlashCardComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    PhotoPageModule,
    AngularFireDatabaseModule,
    LoginPageModule,
    SignupPageModule,
    // HomePageModule,
    RewardPageModule,
    HttpClientModule,
    ChartsModule,
    HttpModule,
    EducationPageModule
    // FlashCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Camera,
    Facebook,
    WebView,
    WheelSelector,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Data
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
