import { Injectable, inject } from '@angular/core';
import { User } from '../modelli/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router=inject(Router)
  isLoggedIn=false;
  user!: User;

  constructor(private http:HttpClient) { }

  isAuthenticated() {
    return this.isLoggedIn
  }

  createUser(id:number, nome: string, cognome: string, email: string, password: string) {
    console.log("creo user")
    this.user = new User(id,nome, cognome, email, password)
    this.isLoggedIn = true;
  }

  signIn(email: string, password: string) {
    console.log("entro in sign in"+email+password);
    this.http.post("http://localhost:3100/api/checkLogin", { email: email, password: password }).subscribe((data: any) => {
      console.log(data)
      if (!data.status)
        alert(data.message)
      else {
        this.createUser(data.data[0].id, data.data[0].nome, data.data[0].cognome, data.data[0].email, data.data[0].password)
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
