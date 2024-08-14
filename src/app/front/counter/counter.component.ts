import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueService } from 'src/app/core/queue.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  queueCount!: Observable<{ count: number } | undefined>;
  userQueueNumber: number | null = null;
  buttonDisabled: boolean = false;

  constructor(private queueService: QueueService) {}

  ngOnInit() {
    this.queueCount = this.queueService.getQueueCount();
    this.userQueueNumber = this.getUserQueueNumber();
    
    // Disable button if the user already joined the queue
    if (this.userQueueNumber !== null) {
      this.buttonDisabled = true;
    }
  }

  joinQueue() {
    this.queueService.joinQueue();
    
    // Get the latest queue count after user joins the queue
    this.queueCount.subscribe((data) => {
      if (data && data.count) {
        this.userQueueNumber = data.count;
        this.saveUserQueueNumber(this.userQueueNumber);
        this.buttonDisabled = true;
      }
    });
  }

  // Save user's queue number to localStorage
  saveUserQueueNumber(queueNumber: number) {
    localStorage.setItem('userQueueNumber', queueNumber.toString());
  }

  // Retrieve user's queue number from localStorage
  getUserQueueNumber(): number | null {
    const queueNumber = localStorage.getItem('userQueueNumber');
    return queueNumber ? parseInt(queueNumber, 10) : null;
  }

}
