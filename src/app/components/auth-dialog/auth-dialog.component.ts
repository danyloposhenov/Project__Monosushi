import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {

  public authForm!: FormGroup;
  public isLogin = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User logined successfully');
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet'])
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.authForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User created successfully');
      this.isLogin = !this.isLogin;
      this.authForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      orders: [],
      role: "USER"
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }
}
