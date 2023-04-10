import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {ActivatedRoute} from "@angular/router";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let activatedRoute: ActivatedRoute;
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
        path: 'name',
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

  const products2 = [
    {
      id: '1',
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
      id: '2',
      category: {
        id: 3,
        name: 'qqq',
        path: 'name',
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

  const product5: IProductResponse = {
    id: '1',
    category: {
      id: '2',
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'your_category' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
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

  it('should not decrement product count when value is false and count is 1', () => {
    const product = { count: 1 } as any;
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });

  it('should add product to empty basket', () => {
    localStorage.clear();
    component.addToBasket(product1);
    expect(localStorage.getItem('basket')).toBe(JSON.stringify([product1]));
  });

});
