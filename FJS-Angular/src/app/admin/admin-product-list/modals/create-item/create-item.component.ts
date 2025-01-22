import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataProductsApiService } from 'src/app/services/data-products-api.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
  jerseyTitle: string = '';
  jerseyImage: File | null = null; // Holds the newly uploaded image
  jerseyImageUrl: string | null = null; // Holds the existing image URL
  jerseyPrice: number = 0;
  jerseyCondition: string = '';
  jerseySize: string = '';
  jerseyDefect: string = '';
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product?: any },
    private dialogRef: MatDialogRef<CreateItemComponent>,
    private dataProductsApiService: DataProductsApiService
  ) {
    // Check if this is edit mode or create mode
    if (data.product) {
      this.isEditMode = true;
      const { product } = data;
      this.jerseyTitle = product.title;
      this.jerseyPrice = product.price;
      this.jerseyCondition = product.condition;
      this.jerseySize = product.size;
      this.jerseyDefect = product.defect;
      this.jerseyImageUrl = product.image; // Retain existing image URL
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.jerseyImage = fileInput.files[0]; // Update to the new image
      this.jerseyImageUrl = null; // Clear the existing image URL to signify new upload
      console.log('Selected image:', this.jerseyImage);
    }
  }

  onSave(): void {
    const productData = new FormData();
    productData.append('title', this.jerseyTitle);
    productData.append('price', this.jerseyPrice.toString());
    productData.append('condition', this.jerseyCondition);
    productData.append('size', this.jerseySize);
    productData.append('defect', this.jerseyDefect);

    // If a new image is uploaded, append it to the form data
    if (this.jerseyImage) {
      productData.append('image', this.jerseyImage);
    } else if (this.jerseyImageUrl) {
      // If no new image is uploaded, send the existing image URL to retain it
      productData.append('existingImage', this.jerseyImageUrl);
    }

    if (this.isEditMode) {
      // Update existing product
      this.dataProductsApiService.updateData(this.data.product.id, productData).subscribe(
        (response) => {
          console.log('Product successfully updated:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Create new product
      this.dataProductsApiService.insertData(productData).subscribe(
        (response) => {
          console.log('Product successfully added:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
