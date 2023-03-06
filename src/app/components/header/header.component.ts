import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public burgerList = false;

  menu(): void {
    if (this.burgerList) {
      this.burgerList = false
    } else {
      this.burgerList = true
    }
  }


}
