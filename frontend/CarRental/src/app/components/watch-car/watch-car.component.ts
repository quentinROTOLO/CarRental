import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/cars';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-watch-car',
  templateUrl: './watch-car.component.html',
  styleUrls: ['./watch-car.component.css']
})
export class WatchCarComponent implements OnInit {
  
  licencePlate :string | undefined;
  car : Car[];
  brand : string;
  userLogged: boolean | undefined; 

  constructor(private app: AppComponent, private router: Router, private authService: AuthService) { 
    this.car = [];
    this.brand = "";
  }

  ngOnInit(): void {
    this.licencePlate = this.router.url.split("/").at(-1)?.toString();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/v1/vehicles/" + this.licencePlate);
    xhr.send();
    xhr.responseType= "json";
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status == 200){
        this.car.push(xhr.response);
      }
    }

    console.log(this.app.getCustomer()); 

  }

  reserveConnectionVerification(): void { 
    console.log(this.app.getCustomer()?.token); 
    if (this.app.getCustomer()?.token === undefined || null) {
      this.router.navigateByUrl('/connection'); 
    } else {
      this.router.navigateByUrl('/reserve'); 
    }
  }
}
