import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public userProducts: Array<IProductResponse> = [];
  public eventSubscription!: Subscription;
  public titleName!: string;

  constructor(
    private productServive: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.LoadProducts();
      }
    })
  }

  ngOnInit(): void {}

  LoadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productServive.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
      this.titleName = data[0].category.name
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
