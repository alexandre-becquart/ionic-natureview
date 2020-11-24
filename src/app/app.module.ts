import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewViewPage } from './pages/new-view/new-view.page';
import { SetCoodinatesPage } from './pages/set-coodinates/set-coodinates.page';
import { NatureViewService } from './shared/services/nature-view.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/Base64/ngx';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { SingleViewPage } from './pages/home/single-view/single-view.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
  declarations: [
    AppComponent,
    SingleViewPage,
    NewViewPage,
    SetCoodinatesPage,
    HomePage
  ],
  entryComponents: [
    AppComponent,
    SingleViewPage,
    NewViewPage,
    SetCoodinatesPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDtomsm7eXWYIgxXUVzzuURGRJYWxwTbb8' }),


  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NatureViewService,
    Geolocation,
    Camera,
    File,
    Base64,
    WebView,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
