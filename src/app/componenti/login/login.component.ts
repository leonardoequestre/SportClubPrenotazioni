import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
export class LoginComponent {
  constructor(private authService:AuthService) { }
  
  onSubmit(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    this.authService.signIn(email, password)
    form.reset()
  }
}
