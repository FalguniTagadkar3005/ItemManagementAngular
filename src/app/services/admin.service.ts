import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../DTO/customObjects';
import { allUsersResponse,allUsersRequest,addUserRequest, userResponse, editUserRequest, allItemTypesRequest, ItemTypesResponse, allUsersResponseWithCount, allItemTypesResponseWithCount, addOrEditItemTypeRequest, allItemsRequest, allItemsResponseWithCount, itemTypesForDropdown } from '../DTO/admin';
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
    return this.http.post<apiResponse<allUsersResponseWithCount>>(this.baseURL+'Admin/GetAllUsers',userRequest,{'headers':headers});
  }

  addUser(user:addUserRequest)
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

  editUser(id:number,user:editUserRequest)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.put<apiResponse<string>>(this.baseURL+'Admin/UpdateUser',user,{'headers':headers,'params':params});
  }

  getUser(id:number)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.get<apiResponse<userResponse>>(this.baseURL+'Admin/GetUserById',{headers:headers,params:params});
  }

  getAllItemTypes(itemTypeFilter:allItemTypesRequest)
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.post<apiResponse<allItemTypesResponseWithCount>>(this.baseURL+'Admin/GetAllItemTypes',itemTypeFilter,{'headers':headers});
  }

  addItemType(itemType:addOrEditItemTypeRequest)
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.post<apiResponse<string>>(this.baseURL+'Admin/AddItemType',itemType,{'headers':headers});
  }

  getItemType(id:number)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.get<apiResponse<ItemTypesResponse>>(this.baseURL+'Admin/GetItemTypeById',{headers:headers,params:params});
  }

  editItemType(id:number,user:addOrEditItemTypeRequest)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.put<apiResponse<string>>(this.baseURL+'Admin/UpdateItemType',user,{'headers':headers,'params':params});
  }
  
  deleteItemType(id:number)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization' :'Bearer '+this.token}  
    const params = {'id':id}
    return this.http.delete<apiResponse<string>>(this.baseURL+'Admin/DeleteItemType',{'headers':headers,'params':params})
  }

  
  getAllItems(itemTypeFilter:allItemsRequest)
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.post<apiResponse<allItemsResponseWithCount>>(this.baseURL+'Admin/GetAllItems',itemTypeFilter,{'headers':headers});
  }

  getAllItemTypesForDropdown()
  {
    const headers = { 'content-type': 'application/json',
                      'Authorization' :'Bearer '+this.token}  
    return this.http.get<apiResponse<itemTypesForDropdown[]>>(this.baseURL+'Admin/GetAllItemTypesForDropdown',{'headers':headers});
  }


}
