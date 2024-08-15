import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { LoginComponent } from './form/login/login.component';
import { RegisterComponent } from './form/register/register.component';
import { AboutComponent } from './page/about/about.component';
import { AdminComponent } from './page/admin/admin.component';
import { DessertComponent } from './page/dessert/dessert.component';
import { DrinkComponent } from './page/drink/drink.component';
import { HomeComponent } from './page/home/home.component';
import { MenuComponent } from './page/menu/menu.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SnackComponent } from './page/snack/snack.component';
import { PurchaseComponent } from './purchase/purchase/purchase.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'admin', component: AdminComponent},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'menu', component: MenuComponent},
  {path:'menu/snack', component: SnackComponent},
  {path:'menu/dessert', component: DessertComponent},
  {path:'menu/drink', component: DrinkComponent},
  {path:'cart', component: CartComponent},
  {path:'purchase', component: PurchaseComponent},
  {path:'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
