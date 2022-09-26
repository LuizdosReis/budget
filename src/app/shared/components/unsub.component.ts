import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export abstract class UnsubComponent implements OnDestroy {
  notifier = new Subject<void>();

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
