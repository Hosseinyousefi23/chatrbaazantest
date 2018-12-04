import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgetpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'product',
    component: ProductDetailComponent
  },
  {
    path: 'basket',
    component: ShoppingCardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
