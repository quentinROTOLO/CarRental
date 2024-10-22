import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ButtonHeaderComponent } from './components/button-header/button-header.component';
import { ContentHomepageComponent } from './components/content-homepage/content-homepage.component';
import { WatchCarComponent } from './components/watch-car/watch-car.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LocationsComponent,
    ContactComponent,
    MyAccountComponent,
    ButtonHeaderComponent,
    ContentHomepageComponent,
    WatchCarComponent,
    ConnectionComponent,
    ReserveComponent, 
    AddCarComponent, 
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
