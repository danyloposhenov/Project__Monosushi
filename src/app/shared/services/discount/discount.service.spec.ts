import { TestBed } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { Firestore } from '@angular/fire/firestore';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        { provide: Firestore, useValue: {} }
      ],
    });
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
