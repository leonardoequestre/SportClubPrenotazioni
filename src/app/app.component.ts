import { Component, OnInit } from '@angular/core';
import { PrenotaService } from './service/prenota.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-prenotazioni';

  constructor(private servizioPrenota:PrenotaService, private authService: AuthService){}

  ngOnInit(): void {
    this.servizioPrenota.getCampi();
    if (localStorage.getItem('user')) {
      const id = JSON.parse(localStorage.getItem('user')!).id
      const nome = JSON.parse(localStorage.getItem('user')!).nome
      const cognome = JSON.parse(localStorage.getItem('user')!).cognome
      const email = JSON.parse(localStorage.getItem('user')!).email
      const password = JSON.parse(localStorage.getItem('user')!).password
      this.authService.createUser(id, nome, cognome, email, password)
      console.log(this.authService.user)
    }
    console.log(this.authService.isLoggedIn)
    console.log(this.authService.user)
  }

}
