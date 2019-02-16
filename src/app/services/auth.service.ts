import { AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';

const USERID_KEY = 'UserEmail';
export interface Image {
  id?: string;
  url: string;
  createdAt?: number;
}
export interface AuthData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private alertClt: AlertController,
    private facebook: Facebook,
    private navCtrl: NavController
  ) { }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(`Successfully create new account: ${JSON.stringify(result)}`);
        const user = firebase.auth().currentUser;
        if (user && !user.emailVerified) {
          user.sendEmailVerification().then(() => {
            this.alertMsg('Email Verification', '', 'Email Verification link is sent, go to check it in your mailbox', ['OK']);
            this.router.navigate(['/login']);
          }, error => {
            this.alertMsg('Sign up failed', '', error, ['OK']);
          });
        }
      })
      .catch(error => {
        this.alertMsg('Sign up failed', '', error, ['OK']);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        const user = firebase.auth().currentUser;
        if (!user.emailVerified) {
          this.alertMsg('Login failed', '', 'Email address is not verified, go check your mainbox', ['OK']);
        } else {
          this.userId = result.user.uid;
          this.saveUserId(result.user.email);
          this.authSuccessfully();
        }
      })
      .catch(error => {
        this.alertMsg('Login Failed', 'Error', error, ['OK']);
      });
  }

  async facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then(success => {
            this.saveUserId(success.user.email);
            this.authSuccessfully();
          })
          .catch(Error => {
            this.alertMsg('Login Failed', '', Error, ['OK']);
          });

      }).catch((error) => {
        this.alertMsg('Login Failed', '', error, ['OK']);
      });
  }

  logout() {
    this.authChange.next(false);
    this.isAuthenticated = false;
    window.localStorage.removeItem(USERID_KEY);
    this.router.navigate(['/home']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/home']);
  }

  async alertMsg(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertClt.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }

  saveUserId(id: string) {
    window.localStorage.removeItem(USERID_KEY);
    window.localStorage.setItem(USERID_KEY, id);
  }

  getUserId(): string {
    return window.localStorage.getItem(USERID_KEY);
  }
}
