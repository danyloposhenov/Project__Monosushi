import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public burgerList = false;
  public isLogin = false;
  public loginPage = '';
  public loginUrl = '';
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public openModal = false;
  public openModalOrder = false;

  constructor (
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.updateCheckUserLogin();
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  updateCheckUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
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
