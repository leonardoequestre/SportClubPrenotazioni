import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterStateSnapshot, UrlHandlingStrategy } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private isOpen = false;
  isLogged = false;
  utente: any
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn
    this.utente=JSON.parse(localStorage.getItem('user')!)
  }
  
  close() {
    this.isOpen=false
    this.sidenav.close();
  }

  open() {
    this.isOpen=true
    this.sidenav.open()
  }

  controllaSidenav() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  onLogout() {
    this.authService.logout()
  }

}
