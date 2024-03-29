
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class DataService {

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}