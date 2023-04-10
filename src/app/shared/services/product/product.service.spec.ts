import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {of} from "rxjs";
import {ICategoryResponse} from "../../interfaces/category/category.interface";

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getAll', () => {
    let productCollection = {
      category: {
        id: '1',
        path: 'path',
        imagePath: 'imagePath',
        name: 'name'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    }
    let product;
    service.getAllFirebase().subscribe(data => {
      product = data;
    });
    expect(service).toBeTruthy();
  });

  it('should call getAllFirebase', () => {
    spyOn(service, 'getAllFirebase').and.returnValue(of([]));
    service.getAllFirebase();
    expect(service.getAllFirebase).toHaveBeenCalled();
  });

  it('should be call getOne', () => {
    let productCollection = {
      category: {
        id: '1',
        path: 'path',
        imagePath: 'imagePath',
        name: 'name'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2
    }
    let product;
    service.getOneFirebase('1').subscribe(data => {
      product = data;
    });
    expect(service).toBeTruthy();
  });
});
