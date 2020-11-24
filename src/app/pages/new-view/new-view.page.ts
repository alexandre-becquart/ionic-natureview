import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { SetCoodinatesPage } from '../set-coodinates/set-coodinates.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Entry, File } from '@ionic-native/file/ngx';
import { NatureViewService } from 'src/app/shared/services/nature-view.service';
import { NatureView } from 'src/app/shared/models/NatureView';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from 'src/app/shared/models/photos';



declare var cordova: any;


@Component({
  selector: 'app-new-view',
  templateUrl: './new-view.page.html',
  styleUrls: ['./new-view.page.scss'],
})
export class NewViewPage implements OnInit {

  natureViewForm: FormGroup;
  latitude: number;
  longitude: number;
  imageUrl: string;
  tempsImage: void;
  safeImg: any;

  public photos: Photo[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private camera: Camera,
    private toastCtrl: ToastController,
    private natureViewService: NatureViewService,
    private navCtrl: NavController,
    private file: File,
    private webview: WebView,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmitForm(): void {
    const newView = new NatureView(
      this.natureViewForm.get('name').value,
      new Date(),
      this.natureViewForm.get('description').value,
      this.latitude,
      this.longitude,
      this.imageUrl
    );

    this.natureViewService.addNatureView(newView);
    this.navCtrl.pop();
  }

  async onOpenCoordsModal() {
    let modal;
    if (this.latitude) {
      modal = await this.modalCtrl.create({
        component: SetCoodinatesPage,
        componentProps: {
          lat: this.latitude,
          lng: this.longitude
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: SetCoodinatesPage
      });
    }

    modal.present();

    const data = await modal.onDidDismiss();
    this.latitude = data.data?.latitude;
    this.longitude = data.data?.longitude;
  }

  async onTakePhoto() {

    //https://ionicframework.com/blog/storing-photos-with-the-cordova-camera-and-file-plugins/

    this.tempsImage = await this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          const path = data.replace(/[^\/]*$/, '');
          const filename = data.replace(/^.*[\\\/]/, '');
          const targetDirectory = cordova.file.dataDirectory;
          this.file.moveFile(path, filename, targetDirectory, filename + new Date().getTime()).then(
            (d: Entry) => {
              this.imageUrl = 'data:image/jpeg;base64,' + d.name;
              this.camera.cleanup();
            }
          );
        }
      }
    ).catch(
      async (error) => {
        (await this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        })).present();
        this.camera.cleanup();
      }
    );
  }

  private initForm(): void {
    this.natureViewForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      description: ['']
    });
  }

}
