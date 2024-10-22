import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomepageComponent} from './components/homepage/homepage.component';
import { LocationsComponent } from './components/locations/locations.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { WatchCarComponent } from './components/watch-car/watch-car.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ReserveComponent } from './components/reserve/reserve.component';

const routes: Routes = [
  {path : '', redirectTo: '/homepage', pathMatch: 'full'},
  {path : 'homepage', component : HomepageComponent},
  {path : 'myAccount', component : MyAccountComponent},
  {path : 'locations', component : LocationsComponent},
  {path : 'contact', component : ContactComponent},
  {path:  'watchcar/:licencePlate', component : WatchCarComponent},
  {path:  'addCar/:licencePlate', component: AddCarComponent},
  {path:  'connection', component: ConnectionComponent },
  {path:  'reserve', component: ReserveComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
