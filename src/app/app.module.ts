import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData  } from '@ionic-native/device-motion/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
      AppComponent
  ],
  entryComponents: [],
  imports: [
      FormsModule,
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      NgxMapboxGLModule.withConfig({
          accessToken: 'pk.eyJ1IjoiYmFwdGlzdGVhbmdvdCIsImEiOiJjazNrYTQwdGUwMHdyM2N0NXhhM210YzNzIn0.YefTLUjfpX1uMKBE885C-g',
      })],
  providers: [
    AppComponent,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
