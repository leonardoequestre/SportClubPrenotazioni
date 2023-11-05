import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  private router=inject(Router)

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nome: new FormControl(),
      cognome: new FormControl(),
      data_nascita:new FormControl,
      email: new FormControl(),
      password: new FormControl()
    }); 
  }

  onSubmit() { 
    this.addPersone()
   }

  addPersone() {
    let dati:any = {
      "nome": this.registerForm.value.nome,
      "cognome": this.registerForm.value.cognome,
      "data_nascita": this.registerForm.value.data_nascita,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password
    };
      this.http.post("http://localhost:3100/api/addpersona", dati).subscribe(
        (resultData: any) => {
          if (resultData.status) {
            alert(resultData.message)
            this.registerForm.reset()
            this.router.navigate(['/login'])
          } else {
            alert(resultData.message)
          }
        }
      ) 
  }
}
