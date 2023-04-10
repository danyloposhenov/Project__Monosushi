import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { RouterTestingModule } from '@angular/router/testing';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  const product1: IProductResponse = {
    id: 1,
    category: {
      id: 2,
      name: 'qqq',
      path: 'string',
      imagePath: 'qqq'
    },
    name: 'string',
    path: 'string',
    description: 'string',
    weight: '10',
    price: 10,
    imagePath: 'string',
    count: 2,
  }
  const product2: IProductResponse = {
    id: 1,
    category: {
      id: 2,
      name: 'qqq',
      path: 'string',
      imagePath: 'qqq'
    },
    name: 'string',
    path: 'string',
    description: 'string',
    weight: '10',
    price: 15,
    imagePath: 'string',
    count: 3,
  }

  const products = [
    {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '10',
      price: 10,
      imagePath: 'string',
      count: 2,
    },
    {
      id: 2,
      category: {
        id: 3,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '10',
      price: 15,
      imagePath: 'string',
      count: 3,
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment product count when value is true', () => {
    const product = { count: 1 } as any;
    component.productCount(product, true);
    expect(product.count).toBe(2);
  });

  it('should decrement product count when value is false and count is greater than 1', () => {
    const product = { count: 2 } as any;
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });

  it('should calculate the total price of all products in the basket', () => {
    component.basket = [product1, product2];
    component.getTotalPrice();
    expect(component.total).toBe(65);
  });


  it('should load the basket from local storage and calculate the total price', () => {
    localStorage.clear();
    const products = [];
    products.push(product1);
    products.push(product2)
    localStorage.setItem('basket', JSON.stringify(products));
    component.loadBasket();
    expect(component.basket).toEqual(products);
    expect(component.total).toEqual(65);
  });

  it('should add product to empty basket', () => {
    localStorage.clear();
    component.addToBasket(product1);
    expect(localStorage.getItem('basket')).toBe(JSON.stringify([product1]));
  });
});
