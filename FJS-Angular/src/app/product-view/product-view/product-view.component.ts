import { Component, OnInit } from '@angular/core';
import { DataProductsApiService} from 'src/app/services/data-products-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: any = null;
  productId: number = 0;

  constructor(private dataProductsApiService: DataProductsApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getproductData();
  }


  getproductData() {
    this.dataProductsApiService.getDataById(this.productId).subscribe(
      (res) => {
        console.log('Product', res);
        this.product = res;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
  
}
