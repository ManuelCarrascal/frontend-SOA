import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  active$ = new Subject<string>();

  setActive() {
    this.active$.next('active');
  }

  setInactive() {
    this.active$.next('');
  }
}
