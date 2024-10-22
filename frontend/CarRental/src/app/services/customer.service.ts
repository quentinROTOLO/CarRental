import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  isUserDisconnected: boolean | undefined; 

  constructor() { }

  public getIsUserDisconnected() {
    return this.isUserDisconnected; 
  }

public setIsUserDisconnected(value: boolean | undefined) {
    this.isUserDisconnected = value; 
  }
}
