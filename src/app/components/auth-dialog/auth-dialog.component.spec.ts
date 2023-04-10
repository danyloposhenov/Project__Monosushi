import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule , MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with email and password fields', () => {
    const component = fixture.componentInstance;
    component.initAuthForm();
    const form = component.authForm;
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
    expect(form.get('email')?.valid).toBeFalsy();
    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should initialize registerForm with correct form controls', () => {
    const component = fixture.componentInstance;
    component.initRegisterForm();
    const form = component.registerForm;
    expect(form.contains('firstName')).toBeTruthy();
    expect(form.contains('lastName')).toBeTruthy();
    expect(form.contains('phoneNumber')).toBeTruthy();
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
    expect(form.contains('confirmedPassword')).toBeTruthy();
    expect(form.get('firstName')?.valid).toBeFalsy();
    expect(form.get('lastName')?.valid).toBeFalsy();
    expect(form.get('email')?.valid).toBeFalsy();
    expect(form.get('password')?.valid).toBeFalsy();
    expect(form.get('confirmedPassword')?.valid).toBeFalsy();
  });

  it('should return true if error is present on form control', () => {
    component.registerForm.controls['firstName'].setErrors({ required: true });
    const result = component.checkVisibilityError('firstName', 'required');
    expect(result).toBe(true);
  });

  it('form should be invalid', fakeAsync(()=>{
    component.authForm.controls['email'].setValue('')
    component.authForm.controls['password'].setValue('');
    expect(component.authForm.valid).toBeFalse();
  }))

  it('form should be valid', fakeAsync(()=>{
    component.authForm.controls['email'].setValue('user@gmail.com')
    component.authForm.controls['password'].setValue('qwerty123');
    expect(component.authForm.valid).toBeTruthy();
  }))

  it('isLogined should be true', () => {
    component.changeIsLogin();
    expect(component.isLogin).toBeFalsy();
  });

  it(`should call the loginUser method`,fakeAsync (() => {
    spyOn(component, 'loginUser');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.loginUser).toHaveBeenCalledTimes(1)
  }));

  it(`should call the RegisterUser method`,fakeAsync (() => {
    component.changeIsLogin();
    spyOn(component, 'registerUser');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.registerUser).toHaveBeenCalledTimes(0)
  }));

});
