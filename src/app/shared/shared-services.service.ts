import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { apiResponse, loginRequest, forgotPasswordRequest, resetPasswordRequest, changePassword } from '../DTO/customObjects';
import { Observable } from 'rxjs';
import { userDetail } from '../DTO/customObjects';
import { CookieService } from 'ngx-cookie-service';
import { allUsersResponse } from '../DTO/admin';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  baseURL: string = "https://localhost:7143/TrainingAssignment/";
  http :HttpClient;
  cookieService:CookieService;
  token:string;
  constructor(private _HttpClient:HttpClient,private _cookieService:CookieService) { 
    this.http=_HttpClient;
    this.cookieService = _cookieService;

    if (typeof window !== 'undefined') {
      this.token = this.cookieService.get('JWT');
        if(this.token != null){
        this.token = this.token.replace(/^"(.*)"$/, '$1');
      }}
  }
  

  login(user:loginRequest): Observable<apiResponse<string>> {
    const headers = { 'content-type': 'application/json'}  
    //typecast result to type loginDTO
    return this.http.post<apiResponse<string>>(this.baseURL+ 'Account/Login' , user,{'headers':headers})
  }

  forgotPassword(user:forgotPasswordRequest)
  {
    return this.http.post<apiResponse<string>>(this.baseURL+'Account/ForgotPassword',user)
  }

  resetPassword(id:string,user:resetPasswordRequest)
  {
    const params={'id':id}   
    return this.http.put<apiResponse<string>>(this.baseURL+'Account/ResetPassword',user,{'params':params});
  }

  getUser(jwtToken:string)
  {
    const params={'token':jwtToken}
    return this.http.get<apiResponse<userDetail>>(this.baseURL+'Account/GetUser',{'params':params});
  }

  changePassword(id:number,changePwd:changePassword)
  {
    const headers = { 'content-type': 'application/json'}  
    const params = {'id':id}
    return this.http.post<apiResponse<string>>(this.baseURL+ 'Account/ChangePassword', changePwd,{'headers':headers,'params':params});
  }

  logout()
  {
    this._cookieService.delete('Jwt');
  }
}
