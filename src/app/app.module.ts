import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './form/login/login.component';
import { AdminComponent } from './page/admin/admin.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { SectionComponent } from './component/section/section.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './page/about/about.component';
import { MenuComponent } from './page/menu/menu.component';
import { SnackComponent } from './page/snack/snack.component';
import { DessertComponent } from './page/dessert/dessert.component';
import { DrinkComponent } from './page/drink/drink.component';
import { CartComponent } from './cart/cart/cart.component';
import { PurchaseComponent } from './purchase/purchase/purchase.component';
import { OrderComponent } from './page/order/order.component';
import { RegisterComponent } from './form/register/register.component';
import { ModalComponent } from './purchase/modal/modal.component';
import { ProfileComponent } from './page/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    AboutComponent,
    MenuComponent,
    SnackComponent,
    DessertComponent,
    DrinkComponent,
    CartComponent,
    PurchaseComponent,
    OrderComponent,
    RegisterComponent,
    ModalComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
