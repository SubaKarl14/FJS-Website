import { Component, OnInit } from '@angular/core';
import { DataProductsApiService } from 'src/app/services/data-products-api.service';
import { DataProduct } from 'src/app/services/data-product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  product = new DataProduct();

  constructor(private dataProductsApiService: DataProductsApiService) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    console.log('Fetching products...');
    this.dataProductsApiService.getData().subscribe((data) => {
      // Process each product to parse the images if needed
      this.products = data.map((product: any) => {
        if (typeof product.images === 'string') {
          product.images = JSON.parse(product.images); // Parse if images are stored as a JSON string
        }
        return product;
      });
      console.log(this.products);
    });
  }
}
