import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { CreateItemComponent } from './admin/admin-product-list/modals/create-item/create-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // 
import { DataProductsApiService } from './services/data-products-api.service';
import { HttpClientModule } from '@angular/common/http';  // <-- Add this import

import { FormsModule } from '@angular/forms';
import { ProductViewComponent } from './product-view/product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainPageComponent,
    ProductListComponent,
    AdminProductListComponent,
    CreateItemComponent,
    ProductViewComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataProductsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
