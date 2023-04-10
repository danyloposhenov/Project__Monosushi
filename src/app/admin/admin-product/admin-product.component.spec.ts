import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductComponent } from './admin-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        RouterTestingModule,
      ],
      providers: [
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set editStatus, isUploaded, list, and currentProductID correctly', () => {
    const product = {
      id: '123',
      category: {
        id: 'sds',
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'Pizza',
      path: 'food-pizza',
      description: 'A delicious pizza',
      weight: '500',
      price: 10,
      count: 5,
      imagePath: 'https://example.com/pizza.jpg'
    };

    component.editProduct(product);

    expect(component.editStatus).toBeTrue();
    expect(component.isUploaded).toBeTrue();
    expect(component.list).toBeFalse();
    expect(component.currentProductID).toBe('123');
  });
});
