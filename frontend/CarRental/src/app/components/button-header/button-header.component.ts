import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ItemsService } from 'src/app/services/items.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LogoutResponse } from 'src/app/models/logoutReponse'; 
import { map } from 'rxjs';

@Component({
  selector: 'app-button-header',
  templateUrl: './button-header.component.html',
  styleUrls: ['./button-header.component.css']
})
export class ButtonHeaderComponent implements OnInit {

  
  constructor(private app: AppComponent, private itemsService: ItemsService, private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
  }

  isUserConnected() {
    return this.app.getCustomer()?.token !== undefined || null; 
  }

  userLogout(): void {
    let login = this.app.getCustomer()?.login;
    console.log(this.app.getCustomer()); 
    console.log(login); 
    this.itemsService.getItems('http://localhost:8080/api/v1/admin/logout/' + login)
      .subscribe((response) => {
        if (response) { 
          console.log("Logout successful");
          // Clear the customer and token data from the app object
          this.app.setCustomer(null);
          this.customerService.setIsUserDisconnected(true); 
          // Navigate to the login page
          this.router.navigate(['/homepage']);
        } else {
          console.log("Logout failed");
        }
      }); 
  }

}


