import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueueCounter } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private firestore: AngularFirestore) {}

  async joinQueue() {
    const queueRef = this.firestore.doc<QueueCounter>('queue/counter');
    
    try {
      await this.firestore.firestore.runTransaction(async (transaction) => {
        const doc = await transaction.get(queueRef.ref);
        if (!doc.exists) {
          // If the document doesn't exist, create it with an initial count of 1
          transaction.set(queueRef.ref, { count: 1 });
        } else {
          // If it exists, increment the count
          const newCount = (doc.data()?.count || 0) + 1;
          transaction.update(queueRef.ref, { count: newCount });
        }
      });
    } catch (error) {
      console.error("Error joining the queue: ", error);
    }
  }

  getQueueCount() {
    return this.firestore.doc<QueueCounter>('queue/counter').valueChanges();
  }
}
