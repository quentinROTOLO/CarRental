import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ItemsService } from 'src/app/services/items.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  customer: any;
  customerId: number | undefined;

  constructor(public customerService: CustomerService, public itemsService: ItemsService, public app: AppComponent) {
    this.customer = [];
  }

  ngOnInit(): void {
    if (!this.customerService.getIsUserDisconnected()) {
      console.log(this.app.getCustomer());
      this.customerId = this.app.getCustomer()?.id;
      this.displayUserData(this.customerId);
    }
  }

  displayUserData(id: number | undefined) {
    this.itemsService.getItems('http://localhost:8080/api/v1/customers/id/' + id)
      .subscribe(items => {
        console.log(items); 
        this.customer = items;
      });
  }

}
