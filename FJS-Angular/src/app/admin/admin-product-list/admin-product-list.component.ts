import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from './modals/create-item/create-item.component';
import { DataProductsApiService } from 'src/app/services/data-products-api.service';
import { DataProduct } from 'src/app/services/data-product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  products: any[] = [];

  product = new DataProduct();

  constructor(private dataProductsApiService: DataProductsApiService, private dialog: MatDialog) {}

  openCreateProductDialog() {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '500px',
      height: '650px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.products.push(result);
        console.log(result);
      }
    });
  }
  

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


  deleteProduct(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataProductsApiService.deleteData(id).subscribe(
          (res) => {
            console.log('Product Deleted', res);
            this.getProductsData();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            console.error('Error deleting product', error);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the product.",
              icon: "error"
            });
          }
        );
      }
    });
  }
  
openProductDialog(product?: any) {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '600px',
      data: { product } // Pass the product if editing, otherwise undefined
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refresh the product list after adding or editing
        this.getProductsData();
      }
    });
  }
  
}
