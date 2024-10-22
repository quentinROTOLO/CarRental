import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  public AfficherMessage(message:string, email:string){
    if(message.length > 0 && email.length > 0){
      console.log(message +" envoyé par " + email);
      alert("Votre message a bien été envoyé, nos équipes vous répondront le plus rapidement possible.");
    }else{
      alert("Merci de remplir les deux champs du formulaire");
    }
    
  }

}
