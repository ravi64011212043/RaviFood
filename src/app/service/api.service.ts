import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiEndpoint = 'http://localhost/api';
  cartUpdated: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
