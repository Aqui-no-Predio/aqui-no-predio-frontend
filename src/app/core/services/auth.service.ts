import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessGrantedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  accessGranted$: Observable<boolean> = this.accessGrantedSubject.asObservable();

  constructor() { }

  setAccessGranted(granted: boolean): void {
    this.accessGrantedSubject.next(granted);
  }
}

