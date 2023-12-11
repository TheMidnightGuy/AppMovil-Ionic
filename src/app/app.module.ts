import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClient, HttpClientModule} from '@angular/common/http'
import {ConsumoAPIService} from '../app/services/consumo-api.service';


import { QRCodeModule } from 'angularx-qrcode';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';









@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      QRCodeModule,
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }, ConsumoAPIService, HttpClientModule],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
