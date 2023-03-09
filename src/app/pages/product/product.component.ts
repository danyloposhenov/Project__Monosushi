import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  userProducts: Array<IProductResponse> = [];

  ngOnInit(): void {
    this.getAll();
  }

  constructor(
    private productServive: ProductService
  ) { }

  getAll(): void {
    this.productServive.getAll().subscribe(data => {
      this.userProducts = data;
    })
  }

}
