import { CanActivateFn, Router } from '@angular/router';
import {inject} from'@angular/core';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router=inject(Router)
  if (auth.isAuthenticated()) {
    return true
  } else{
    alert("Fai il Login")
    router.navigate(['/login'])
    return false
  }
};
