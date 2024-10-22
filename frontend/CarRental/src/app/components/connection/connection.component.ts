import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from '../../services/items.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../../models/customer';
import { Observable, map } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  authForm: FormGroup;
  isSubmited = false;
  formError = false;
  customerList: any[];
  customerListOk: boolean = false;
  public customers?: {};

  constructor(public app: AppComponent, private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private itemsService: ItemsService, public customerService: CustomerService) {
    this.authForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.customers = [];
    this.customerList = [];
  }

  ngOnInit(): void {
    console.log("page de connection");
  }

  get formControls() {
    return this.authForm?.controls;
  }

  signIn(): void { }

  adminConnection(tokenValue: string | undefined): void {
    let adminConnectionParams = JSON.stringify({ login: "admin", pwd: "admin", token: tokenValue });
    if (tokenValue === null) {
      this.itemsService.postItems('http://localhost:8080/api/v1/admin/login', adminConnectionParams);
    }
    else {
      console.log("Vous êtes déjà connecté");
    }
  }

  getAdminToken(): string | undefined {
    let adminToken;
    let adminData = this.itemsService.getItems('http://localhost:8080/api/v1/customers/id/11').subscribe(response => {
      const seenObjects = new Set();
      const adminData = JSON.stringify(response, (key, value) => {
        // Check for circular references and replace them with null
        if (typeof value === 'object' && value !== null) {
          if (seenObjects.has(value)) {
            return null;
          }
          seenObjects.add(value);
        }
        return value;
      });

      let adminDataParse = JSON.parse(adminData);
      if ('token' in adminDataParse) {
        adminToken = adminDataParse.token;
        console.log("token du client: " + adminToken);
      } else {
        adminToken = null;
      }
    })
    return adminToken;
  }


  /** -------------------------------------------------------------------- */

  getCustomers(): Customer[] {
    this.itemsService.getItems('http://localhost:8080/api/v1/customers')
      .subscribe(items => {
        console.log(items);
        return items;
      }); 
    return []; 
    }

  getCustomersPassword(): any {
    return {};
  }

  getCustomerPassword(currentCustomer: Customer): string | undefined {
    return currentCustomer ? currentCustomer.pwd : undefined;
  }

  submitForm() {
    console.log("on a soumis le formulaire");
    let enteredLogin = this.authForm.value.login;
    let enteredPwd = this.authForm.value.password;
    this.itemsService.getItems('http://localhost:8080/api/v1/customers')
      .subscribe((items: any) => {
        items.forEach((element: any) => {
          console.log("login: " + element.login + " pwd:" + element.pwd);
          if (element.login === enteredLogin && element.pwd === enteredPwd) {
            console.log("appel à l'api pour connection");
            this.itemsService.postItems('http://localhost:8080/api/v1/admin/login', JSON.stringify({ login: enteredLogin, pwd: enteredPwd, token: null }))
              .subscribe(items => {
                console.log(items); 
                this.app.setCustomer(items);    
                this.customerService.setIsUserDisconnected(false); 
                this.router.navigate(['/locations']);
              })
            return;
          }
        });
      });
  }

  // customerIdByLogin = (login: string, customerList: Customer[]): string | undefined => {
  //   const customer = customerList.find(c => c.login === login);
  //   return customer ? customer.id : undefined;
  // };

  // getCustomerById(id: string | undefined): Observable<Customer> {
  //   return this.itemsService.getItems('http://localhost:8080/api/v1/customers/id/' + id)
  //     .pipe(
  //       map((customer: Customer) => {
  //         return customer;
  //       })
  //     );
  // }

  // verifyUserConnection(): void {
  //   console.log(this.authForm.value.login);
  //   console.log(this.authForm.value.password);

  //   let id = this.customerIdByLogin(this.authForm.value.login, this.customerList);
  //   this.getCustomerById(id).subscribe((customer: Customer) => {
  //     let customerPwd = this.getCustomerPassword(customer);
  //     if (customerPwd === this.authForm.value.password) {
  //       console.info(customer);
  //       console.log("Login successful");
  //       // this.authService.signIn(customer.token); // Store user token in AuthService
  //       this.router.navigate(['/myAccount']); // Redirect to dashboard
  //       return;
  //     } else {
  //       console.log("Login failed");
  //       this.formError = true;
  //     }

  //   });
  // }

}