import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(private authService:AuthService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    const isAuthenticated = this.authService.getRoleFromToken();
    if (isAuthenticated==='Admin') {
      return true; 
    } else {

      this.router.navigate(['/login']); 
      return false; 
    }
  };
}
