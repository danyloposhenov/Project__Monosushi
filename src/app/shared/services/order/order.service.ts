import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject <boolean>;

  constructor() { }

}
