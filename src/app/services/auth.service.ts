import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string|null;
  constructor(private _cookieService:CookieService) {
   }

   getToken()
   {
     return this._cookieService.get('Jwt'); 
   }

   getDecodedToken()
   {
    this.token = this.getToken();
    try {
      return jwt_decode.jwtDecode(this.token as string);
    } catch (Error) {
      return null;
    }
   }

   getUserIdFromToken(): string {
    const decodedToken: any = this.getDecodedToken();
    return decodedToken ? decodedToken.Id : '0'; // Assuming 'sub' is the key for user ID in your token claims
  }

    getRoleFromToken():string|null
    {
      const decodedToken : any = this.getDecodedToken();
      return decodedToken? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
    }
}
