import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './AuthService/login/login.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { ProductViewComponent } from './product-view/product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  }, 
  {
    path: 'product-view',
    component: ProductViewComponent
  },
  {
   path: 'product/:id', component: ProductViewComponent  // Dynamic product preview route

  },

  // for admin
  {
    path: 'admin-product-list',
    component: AdminProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
