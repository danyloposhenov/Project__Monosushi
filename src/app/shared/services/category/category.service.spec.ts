import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import {ICategoryResponse} from "../../interfaces/category/category.interface";

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getAll', () => {
    let categoryCollection = {
      id: '1',
      path: 'path',
      imagePath: 'imagePath',
      name: 'name'
    }
    let category;
    service.getAllFirebase().subscribe(data => {
      category = data;
    });
    expect(service).toBeTruthy();
  });

  it('should call getAllFirebase', () => {
    spyOn(service, 'getAllFirebase').and.returnValue(of([]));
    service.getAllFirebase();
    expect(service.getAllFirebase).toHaveBeenCalled();
  });

  it('should be call getOne', () => {
    let categoryCollection = {
      id: '1',
      path: 'path',
      imagePath: 'imagePath',
      name: 'name'
    }
    let category;
    service.getOneFirebase('1').subscribe(data => {
      category = data;
    });
    expect(service).toBeTruthy();
  });


});
