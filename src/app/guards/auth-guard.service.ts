import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    const isAuthenticated = this.authService.getDecodedToken();
    if (isAuthenticated!==null) {
      return true; 
    } else {

      this.router.navigate(['/login']); 
      return false; 
    }
  };
}
