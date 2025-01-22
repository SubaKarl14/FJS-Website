import { Component, OnInit } from '@angular/core';
import { DataProductsApiService } from 'src/app/services/data-products-api.service';
import { DataProduct } from 'src/app/services/data-product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

    products: any[] = [];
  
    product = new DataProduct();
  constructor(private dataProductsApiService: DataProductsApiService) {}


  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    console.log(this.products);
    console.log('getProductsData');
    this.dataProductsApiService.getData().subscribe((err) => {
      this.products = err;
      console.log(err);
    })
}
}
