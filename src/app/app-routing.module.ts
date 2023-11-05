import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { authGuard } from './auth/auth.guard';
import { PrenotaComponent } from './componenti/prenota/prenota.component';
import { PrenotazioniComponent } from './componenti/prenotazioni/prenotazioni.component';
import { HomeComponent } from './componenti/home/home.component';

const routes: Routes = [
  {
    path: '', component:HomeComponent, canActivate:[authGuard], canActivateChild:[authGuard], children: [
      { path: '', redirectTo:'prenota', pathMatch:'full' },
      { path: 'prenota', component: PrenotaComponent },
      { path: 'prenotazioni', component: PrenotazioniComponent }
    ]
  },
  {
    path: '', component: HomeComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
