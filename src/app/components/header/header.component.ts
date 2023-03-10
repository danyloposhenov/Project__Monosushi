import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public burgerList = false;
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public openModal = false;
  public openModalOrder = false;

  constructor ( private orderService: OrderService ) {  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    if (this.basket.length > 0) {
      this.openModalOrder = true;
    }
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) =>  total + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }




  modal(): void {
    if (this.openModal) {
      this.openModal = false;

    } else {
      this.openModal = true
    }
  }

  menu(): void {
    if (this.burgerList) {
      this.burgerList = false
    } else {
      this.burgerList = true
    }
  }

}
