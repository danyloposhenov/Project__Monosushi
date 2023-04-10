import { TestBed } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {of} from "rxjs";

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getAll', () => {
    let discountCollection = {
      id: '1',
      path: 'path',
      name: 'name'
    }
    let discount1
    service.getAllFirebase().subscribe(data => {
      discount1 = data;
    });
    expect(service).toBeTruthy();
  });

  it('should call getAllFirebase', () => {
    spyOn(service, 'getAllFirebase').and.returnValue(of([]));
    service.getAllFirebase();
    expect(service.getAllFirebase).toHaveBeenCalled();
  });

  it('should be call getOne', () => {
    let discountCollection = {
      id: '1',
      path: 'path',
      name: 'name'
    }
    let discount1;
    service.getOneFirebase('1').subscribe(data => {
      discount1 = data;
    });
    expect(service).toBeTruthy();
  });
});


