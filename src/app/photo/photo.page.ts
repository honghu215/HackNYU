import { ItemModalPage } from './item-modal/item-modal.page';
import { PhotoService } from './../services/photo.service';
import { GoogleVisionService } from './../services/google-vision.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  isLoggedin = false;
  userId: string;
  dbItems: AngularFireList<any>;
  imageLabels = [];
  imageUrl = null;
  queryString: string;
  itemName: string;
  nutritionResult: any;
  itemString = '';

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private file: File,
    private camera: Camera,
    private auth: AuthService,
    private photoService: PhotoService,
    private vision: GoogleVisionService,
    private db: AngularFireDatabase,
    private webView: WebView,
    private loadingCtrl: LoadingController
  ) {
    this.userId = this.auth.getUserId();
    this.dbItems = db.list(this.userId.split('@')[0]);
    // this.dbItems.valueChanges().subscribe( items => {

    // });
  }

  ngOnInit() {
    this.auth.authChange.subscribe(logStatus => {
      this.isLoggedin = logStatus;
    });
  }

  async capture(sourceType: number) {
    this.init();
    let cameraOptions: CameraOptions;
    if (sourceType === 0) {
      cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };
    }
    if (sourceType === 1) {
      cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        saveToPhotoAlbum: true
      };
    }

    try {
      const imgInfo = await this.camera.getPicture(cameraOptions);
      this.imageUrl = this.webView.convertFileSrc(imgInfo);
      const blobInfo = await this.makeFileIntoBlob(imgInfo);
      await this.upload(blobInfo);
    } catch (e) {
      if (e.message != null) {
        this.showAlert('Error', e.message);
      }
    }
  }

  async visionAnalyze(imgUrl) {
    const analyzing = await this.loadingCtrl.create({
      message: 'Analyzing...'
    });
    await analyzing.present();
    this.vision.getLabels(imgUrl).subscribe(result => {
      this.imageLabels = (result.responses[0].labelAnnotations);
      analyzing.dismiss();
      this.saveResults(imgUrl, result.responses);
    }, error => {
      this.showAlert('Error', error);
    });
  }
  async upload(imgBlobInfo) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });
    await loading.present();

    return new Promise((resolve, reject) => {
      const currDateTime = new Date();
      const fileName = currDateTime.getFullYear() + '-' + (currDateTime.getMonth() + 1) + '-' + currDateTime.getDay()
        + '-' + currDateTime.getHours() + ':' + currDateTime.getMinutes() + ':' + currDateTime.getSeconds();
      const fileRef = firebase.storage().ref(this.userId + '/' + fileName + imgBlobInfo.fileName);
      const uploadTask = fileRef.put(imgBlobInfo.imgBlob);

      uploadTask.on('state_changed',
        (_snapshot: any) => {
          console.log('snapshot progess ' + (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100);
        },
        _error => {
          loading.dismiss();
          reject(_error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            loading.dismiss();
            this.visionAnalyze(downloadURL);
          });
        }
      );
    });
  }

  async saveResults(imageUrl: string, results) {
    this.dbItems.push({
      imageUrl: imageUrl,
      results: results
    })
      .then(_ => { })
      .catch(error => {
        this.showAlert('Error', error);
      });
    // this.getItemName();
  }


  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  getNutrition(queryString: string) {
    this.photoService.calculateNutrition(queryString).subscribe(response => {
      this.nutritionResult = response.foods[0];
    }, error => {
      this.showAlert('Not Found', error.error.message);
      this.init();
    });
  }

  close() {
    this.init();
    this.showAlert('Error', 'Please retake/select a photo');
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ItemModalPage,
      componentProps: {
        itemName: this.itemName
      },
      cssClass: 'modalCss'
    });
    modal.present();

    modal.onDidDismiss().then(res => {
      if (res.data == null) { return; }
      this.itemString = res.data.data;
      this.getNutrition(res.data.data);
    });
  }

  init() {
    this.itemName = '';
    this.nutritionResult = {};
    this.imageLabels = [];
    this.itemString = '';
  }

  async makeFileIntoBlob(imgPath) {
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imgPath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          fileName = name;
          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

}
