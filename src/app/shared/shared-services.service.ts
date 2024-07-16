import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { apiResponse, loginRequest, forgotPasswordRequest, resetPasswordRequest } from './DTO/customObjects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  baseURL: string = "https://localhost:7143/TrainingAssignment/";
  http :HttpClient;
  constructor(private _HttpClient:HttpClient) { 
    this.http=_HttpClient;
  }


  login(user:loginRequest): Observable<apiResponse<string>> {
    const headers = { 'content-type': 'application/json'}  
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
}
