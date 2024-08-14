import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FirebaseOptions } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { UserService } from './core/user.service';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDHanhDcIEgrSkqUYJrN6qdR79Hck1VA10",
  authDomain: "mc2024-287f4.firebaseapp.com",
  databaseURL: "https://mc2024-287f4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mc2024-287f4",
  storageBucket: "mc2024-287f4.appspot.com",
  messagingSenderId: "369031448977",
  appId: "1:369031448977:web:5cf6354594270ea22cf230",
  measurementId: "G-5Z6KQ4RLR5"

};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    UserService
   ]
};
