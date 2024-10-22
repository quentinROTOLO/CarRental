import { Component } from '@angular/core';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CarRental';
  customer?: Customer | null;
  token = this.customer?.token; 

  public getCustomer(): Customer | null | undefined {
    return this.customer;
  }

  public setCustomer(value: Customer | null) {
    this.customer = value;
    this.token = value?.token;
  }

}