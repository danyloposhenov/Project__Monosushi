import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {ROLE} from "../../shared/constants/role.constant";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const FAKE_BASKET = [
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
      count: 2
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('should set isLogin to true and set correct values for loginUrl and loginPage when currentUser has role "admin"', () => {
    const currentUser = { role: ROLE.ADMIN };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toEqual('admin');
    expect(component.loginPage).toEqual('Admin');
  });

  it('should set isLogin to true and set correct values for loginUrl and loginPage when currentUser has role "user"', () => {
    const currentUser = { role: ROLE.USER };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toEqual('cabinet');
    expect(component.loginPage).toEqual('Cabinet');
  });

  it('should set isLogin to false and clear loginUrl and loginPage when currentUser is not defined or has an unrecognized role', () => {
    const currentUser = null;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBeFalse();
    expect(component.loginUrl).toEqual('');
    expect(component.loginPage).toEqual('');
  });
});
