import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../../models/cars';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carForm: Car = {
    id: -1,
    licencePlate: "",
    brand: "",
    model: "",
    color: "",
    rentalPrice: 0,
    kmPrice: 0,
    horsePower: 0,
    urlImg: ""
  };
  isModif: boolean = false;
  constructor(private router: Router, private itemsService: ItemsService) {

  }

  ngOnInit(): void {
    if (this.router.url.split("/").at(-1)?.toString() != '') {
      this.isModif = true;
      var licencePlate = this.router.url.split("/").at(-1)?.toString();
      this.itemsService.getItems('http://localhost:8080/api/v1/vehicles/' + licencePlate)
      .subscribe(items => {
        this.carForm = items;        
      });
      
    }
  }

  AjoutVoiture() {
    var test = document.getElementById("licencePlate") as HTMLInputElement;
    var licencePlate = test?.value;
    if (this.isModif) {
      var carFormModif = {
        id: this.carForm.id,
        licencePlate: licencePlate,
        brand: (document.getElementById("brand") as HTMLInputElement)?.value,
        model: (document.getElementById("model") as HTMLInputElement)?.value,
        color: (document.getElementById("color") as HTMLInputElement)?.value,
        rentalPrice: Number((document.getElementById("rentalPrice") as HTMLInputElement)?.value),
        kmPrice: Number((document.getElementById("kmPrice") as HTMLInputElement)?.value),
        horsePower: Number((document.getElementById("horsePower") as HTMLInputElement)?.value),
        urlImg: (document.getElementById("urlImg") as HTMLInputElement)?.value
      };
      this.itemsService.putItems("http://localhost:8080/api/v1/vehicles/" + licencePlate, JSON.stringify(carFormModif))
        .subscribe(items => {
          alert("Voiture modifiée");
          this.router.navigate(['/locations']);
        });     
    } else {
      if (test?.value != '') {
        var carFormNouv = {
          licencePlate: licencePlate,
          brand: (document.getElementById("brand") as HTMLInputElement)?.value,
          model: (document.getElementById("model") as HTMLInputElement)?.value,
          color: (document.getElementById("color") as HTMLInputElement)?.value,
          rentalPrice: Number((document.getElementById("rentalPrice") as HTMLInputElement)?.value),
          kmPrice: Number((document.getElementById("kmPrice") as HTMLInputElement)?.value),
          horsePower: Number((document.getElementById("horsePower") as HTMLInputElement)?.value),
          urlImg: (document.getElementById("urlImg") as HTMLInputElement)?.value
        };
        this.itemsService.postItems("http://localhost:8080/api/v1/vehicles/add", JSON.stringify(carFormNouv))
          .subscribe(items=>{
            alert("Voiture ajoutée");
            this.router.navigate(['/locations']);
          });
      }
    }
  }

  SupprVoiture() {
    if(this.isModif){
      if(confirm("Etes-vous sûr de vouloir supprimer ce véhicule de la base de données?")){
        this.itemsService.deleteItems("http://localhost:8080/api/v1/vehicles/" + this.carForm.licencePlate)
        .subscribe(items=>{
          alert("Voiture supprimée");
          this.router.navigate(['/locations']);
        });
      }else{
        alert("Voiture non supprimée");
        this.router.navigate(['/locations']);
      }
    }

  }

}
