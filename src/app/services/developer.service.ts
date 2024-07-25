import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../DTO/customObjects';
import { CookieService } from 'ngx-cookie-service';
import { addRequest, allRequestWithCount, allrequestRequest, getAvailableItemsRequest, getRequestByIdResponse, getRequestSingleItemResponse, itemsForDropdown } from '../DTO/developer';
import { itemTypesForDropdown } from '../DTO/admin';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  baseURL: string = "https://localhost:7143/TrainingAssignment/";
  http :HttpClient;
  token:string;
  constructor(private _HttpClient:HttpClient,private _cookieService:CookieService) {
    this.http=_HttpClient;
    this.token = _cookieService.get('Jwt');
   }

   getHeader()
   {
     const header = { 'content-type': 'application/json',
                     'Authorization' :'Bearer '+this.token}  
     return header;
   }

   getAllRequests(request:allrequestRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<allRequestWithCount>>(this.baseURL+'Developer/GetAllRequests',request,{'headers':header});
   }

   getAllItemTypesForDropdown()
   {
     const header = this.getHeader();  
     return this.http.get<apiResponse<itemTypesForDropdown[]>>(this.baseURL+'Developer/GetAllItemTypesForDropdown',{'headers':header});
   }

   getAllItemsForDropdown(id:number)
   {
     const header = this.getHeader(); 
     const params={'id':id}; 
     return this.http.get<apiResponse<itemsForDropdown[]>>(this.baseURL+'Developer/GetAllItemsForDropdown',{'headers':header,'params':params});
   }

   addRequest(req:addRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<any>>(this.baseURL+'Developer/AddRequest',req,{'headers':header});
   }

   getAllReturnRequests(request:allrequestRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<allRequestWithCount>>(this.baseURL+'Developer/GetAllReturnRequests',request,{'headers':header});
   }

   getRequest(id:number)
   {
     const header = this.getHeader(); 
     const params={'id':id}; 
     return this.http.get<apiResponse<getRequestByIdResponse>>(this.baseURL+'Developer/GetRequest',{'headers':header,'params':params});
   }

   editRequest(id:number,req:addRequest)
   {
      const header = this.getHeader();
      const params={'id':id}; 
      return this.http.put<apiResponse<any>>(this.baseURL+'Developer/ManageRequest',req,{'headers':header,'params':params});
   }

   cancelRequest(id:number)
   {
      const header = this.getHeader();
      const params={'id':id}; 
      return this.http.delete<apiResponse<any>>(this.baseURL+'Developer/CancelRequest',{'headers':header,'params':params});
   }

   getAvailableItems(req:getAvailableItemsRequest)
   {
     const headers = this.getHeader();
     return this.http.post<apiResponse<getRequestSingleItemResponse[]>>(this.baseURL+'Developer/GetAvailableItems',req,{headers:headers});
   }

   cancelReturnRequest(id:number)
   {
      const header = this.getHeader();
      const params={'id':id}; 
      return this.http.delete<apiResponse<any>>(this.baseURL+'Developer/CancelReturnRequest',{'headers':header,'params':params});
   }

   addReturnRequest(req:addRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<any>>(this.baseURL+'Developer/AddReturnRequest',req,{'headers':header});
   }

   editReturnRequest(id:number,req:addRequest)
   {
      const header = this.getHeader();
      const params={'id':id}; 
      return this.http.put<apiResponse<any>>(this.baseURL+'Developer/ManageReturnRequest',req,{'headers':header,'params':params});
   }
}
