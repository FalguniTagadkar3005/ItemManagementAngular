import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../DTO/customObjects';
import { allUsersResponse,allUsersRequest,addOrEditUserRequest, userResponse } from '../DTO/admin';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL: string = "https://localhost:7143/TrainingAssignment/";
  http :HttpClient;
  token:string;
  constructor(private _HttpClient:HttpClient,private _cookieService:CookieService) {
    this.http=_HttpClient;
    this.token = _cookieService.get('Jwt');
   }

   
  getAllUsers(userRequest:allUsersRequest)
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.post<apiResponse<allUsersResponse[]>>(this.baseURL+'Admin/GetAllUsers',userRequest,{'headers':headers});
  }

  addUser(user:addOrEditUserRequest)
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.post<apiResponse<string>>(this.baseURL+'Admin/AddUser',user,{'headers':headers});
  }

  deleteUser(id:number)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.delete<apiResponse<string>>(this.baseURL+'Admin/DeleteUser',{'headers':headers,'params':params})
  }

  editUser(id:number,user:addOrEditUserRequest)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.put<apiResponse<string>>(this.baseURL+'Admin/UpdateUser',{'headers':headers,'params':params});
  }

  getUser(id:number)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.get<apiResponse<userResponse>>(this.baseURL+'Admin/GetUserById',{headers:headers,params:params});
  }
}
