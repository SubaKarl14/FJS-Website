import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProductsApiService {

  constructor(private httpClient: HttpClient) { }


  getData(): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:8000/products');
  }

  getDataById(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://127.0.0.1:8000/products/${id}`);
  }

  insertData(product: any): Observable<any> {
    return this.httpClient.post('http://127.0.0.1:8000/products/create',product);
  }

  deleteData(id: number): Observable<any> {
    return this.httpClient.delete(`http://127.0.0.1:8000/products/delete/${id}`);
  }

  updateData(id: number, product: any): Observable<any> {
    return this.httpClient.post(`http://127.0.0.1:8000/products/update/${id}`, product);
  }
}
