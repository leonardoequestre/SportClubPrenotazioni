import { Injectable, inject } from '@angular/core';
import { User } from '../modelli/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PrenotaService } from '../service/prenota.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router=inject(Router)
  private isLoggedIn = false;
  private _admin = false;
  user!: User;
  private URLSERVICE=this.pService.URLSERVER

  constructor(private http:HttpClient, private pService:PrenotaService) { }

  isAuthenticated() {
    return this.isLoggedIn
  }
  isAdmin() {
   return this._admin 
  }

  createUser(id:number, nome: string, cognome: string, email: string, password: string, admin:number) {
    console.log("creo user")
    this.user = new User(id,nome, cognome, email, password, admin)
    this.isLoggedIn = true;
  }

  signIn(email: string, password: string) {
    console.log("entro in sign in"+email+password);
    this.http.post(this.URLSERVICE+"/api/checkLogin", { email: email, password: password }).subscribe((data: any) => {
      console.log(data)
      if (!data.status)
        alert(data.message)
      else {
        if (data.data[0].admin == 1)
          this._admin = true
        else
          this._admin = false
        this.createUser(data.data[0].id, data.data[0].nome, data.data[0].cognome, data.data[0].email, data.data[0].password, data.data[0].admin)
        console.log(this.user)
        localStorage.setItem('user', JSON.stringify(this.user))
        alert(`Login Effettuato correttamente ${this.user.nome} ${this.user.cognome}`)
        this.router.navigate(['/prenota'])
      }
    })
  }

  logout() {
    this.isLoggedIn = false
    console.log(this.isLoggedIn)
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }
}
