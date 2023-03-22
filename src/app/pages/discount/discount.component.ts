import { Component } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {

  userDiscounts: Array<IDiscountResponse> = [];

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscounts = data as IDiscountResponse[];
    })
  }

}
