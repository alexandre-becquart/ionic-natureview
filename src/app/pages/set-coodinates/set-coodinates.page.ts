import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-set-coodinates',
  templateUrl: './set-coodinates.page.html',
  styleUrls: ['./set-coodinates.page.scss'],
})
export class SetCoodinatesPage implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  latitude: number;
  longitude: number;

  marker: {
    latitude: number,
    longitude: number,
    draggable: true
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.latitude = 57.28;
    this.longitude = -2.58;

    if (this.lat) {
      this.latitude = this.lat;
      this.longitude = this.lng;
      this.marker = {
        latitude: this.lat,
        longitude: this.lng,
        draggable: true
      };
    }
  }

  onCancel(): void {
    this.modalCtrl.dismiss();
  }

  onSave(): void {
    this.modalCtrl.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }

  onMapClicked($event): void {
    // console.log($event);
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  async onLocateMe() {
    const loader = await this.loadingCtrl.create({
      message: 'Recherche de votre position'
    });
    loader.present();

    this.geolocation.getCurrentPosition().then(
      (res) => {
        loader.dismiss();
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        this.marker = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
          draggable: true
        };

      }
    ).catch(
      async (error) => {
        loader.dismiss();
        (await this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        })).present();
      }
    );
  }


}
