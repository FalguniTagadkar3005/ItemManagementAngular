import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../DTO/customObjects';
import { CookieService } from 'ngx-cookie-service';
import { addRequest, allRequestWithCount, allrequestRequest, itemsForDropdown } from '../DTO/developer';
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
}
