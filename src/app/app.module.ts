import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Facebook } from '@ionic-native/facebook/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AuthModule } from './services/auth/auth.module';
import { APIService } from './services/api/api.service';
import { DatesService } from './services/dates/dates.service';

import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
      AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,

    FormsModule,
    ReactiveFormsModule,

    ComponentsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    InAppBrowser,

    Facebook,
    OneSignal,

    DatesService,
    APIService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
