import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Car } from '../../models/cars';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  public carDetails: any;
  brands: string[];
  colors: string[];
  loaded: boolean;

  constructor(private app: AppComponent, private itemsService: ItemsService) {
    this.carDetails = [];
    this.brands = [];
    this.colors = [];
    this.loaded = false;
  }

  ngOnInit(): void {
    console.log(this.app.customer); 
    this.getCars(); 
  }

  getCars() {
    this.itemsService.getItems('http://localhost:8080/api/v1/vehicles')
      .subscribe(items => {
        this.carDetails = items;
        this.setFilters();
        this.loaded = true;
      });
  }

  resetCars() {
    this.carDetails = [];
    this.loaded = false;
  }

  setFilters() {
    this.carDetails.forEach((element: Car) => {
      let brand = "";
      if (element.brand != undefined) {
        brand = element.brand;
      }
      if (!this.brands.includes(brand)) {
        this.brands.push(brand);
      }
      let color = '';
      if (element.color != undefined) {
        color = element.color;
      }
      if (!this.colors.includes(color)) {
        this.colors.push(color);
      }
    });
  }

  filterColor(filtreColor: string) {
    this.resetCars();
    if(filtreColor == "Couleur"){
      this.resetFilters();
    }else{
      this.itemsService.getItems('http://localhost:8080/api/v1/vehicles/color/' + filtreColor)
      .subscribe(items => {
        this.carDetails = items;
        this.loaded = true;
      });
    }
    
  }

  filterBrand(filterBrand : string){
    this.resetCars();
    if(filterBrand == "Marque"){
      this.resetFilters();
    }else{
      this.itemsService.getItems('http://localhost:8080/api/v1/vehicles/brand/' + filterBrand)
        .subscribe(items => {
          this.carDetails = items;
          this.loaded = true;
        });
    }
  }

  resetFilters(){
    
    this.resetCars();
    var brand = document.getElementById("brand") as HTMLSelectElement;
    
    brand.value = "Marque";
    var color = document.getElementById("color") as HTMLSelectElement;
    color.value = "Couleur";
    this.getCars();
  }

}
