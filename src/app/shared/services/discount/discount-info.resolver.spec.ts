import { TestBed } from '@angular/core/testing';
import { DiscountInfoResolver } from './discount-info.resolver';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
describe('DiscountInfoResolver', () => {
  let resolver: DiscountInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ]
    });
    resolver = TestBed.inject(DiscountInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
