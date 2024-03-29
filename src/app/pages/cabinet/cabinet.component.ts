import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {

  constructor (
    private accountService: AccountService,
    private router: Router
  ) {}

  logOut(): void {
    this.router.navigate(['/'])
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
}
