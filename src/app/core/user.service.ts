import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueueCounter } from './interfaces';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  getCurrentUser(): Promise<User> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(userUpdatedInfos: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = this.afAuth.currentUser.then(user => {
        user?.updateProfile({
          displayName: userUpdatedInfos.name,
          photoURL: userUpdatedInfos.photoURL
        }).then(res => {
          console.log(res);
          return resolve(res);
        }, err => reject(err));
      });
      });
  }

  resetQueue() {
    this.firestore.doc('queue/counter').set({ count: 0 });
  }

  callNext() {
    const queueRef = this.firestore.doc<QueueCounter>('queue/counter');
    this.firestore.firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(queueRef.ref);
      const currentCount = doc.data()?.count || 0;
      if (currentCount > 0) {
        transaction.update(queueRef.ref, { count: currentCount - 1 });
      }
    });
  }

}
