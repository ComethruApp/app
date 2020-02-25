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
import { BrowserService } from './services/browser/browser.service';

import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { IonicStorageModule } from '@ionic/storage';

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

        HttpClientModule,
        IonicStorageModule.forRoot(),

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

        Camera,
        File,
        WebView,

        APIService,
        DatesService,
        BrowserService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
