import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../DTO/customObjects';
import { CookieService } from 'ngx-cookie-service';
import { addPurchaseRequest, getAllDeveloperRequest, getAllDeveloperRequestResponse, getAllPurchaseRequest, getAllPurchaseRequestResponse, getAllPurchaseRequestSingleResponse } from '../DTO/networkAdmin';
import { itemTypesForDropdown } from '../DTO/admin';
import { itemsForDropdown } from '../DTO/developer';
@Injectable({
  providedIn: 'root'
})
export class NetworkAdminService {

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

   getAllPurchaseRequest(body:getAllPurchaseRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<getAllPurchaseRequestResponse>>(this.baseURL+'NetworkAdmin/GetAllPurchaseRequests',body,{'headers':header});
   }

   getAllDeveloperRequest(body:getAllDeveloperRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<getAllDeveloperRequestResponse>>(this.baseURL+'NetworkAdmin/GetAllRequests',body,{'headers':header});
   }

   getAllItemTypesForDropdown()
   {
     const header = this.getHeader();  
     return this.http.get<apiResponse<itemTypesForDropdown[]>>(this.baseURL+'NetworkAdmin/GetAllItemTypesForDropdown',{'headers':header});
   }

   getAllItemsForDropdown(id:number)
   {
     const header = this.getHeader(); 
     const params={'id':id}; 
     return this.http.get<apiResponse<itemsForDropdown[]>>(this.baseURL+'NetworkAdmin/GetAllItemsForDropdown',{'headers':header,'params':params});
   }

   addPurchaseRequest(req:addPurchaseRequest)
   {
      const header = this.getHeader();
      return this.http.post<apiResponse<any>>(this.baseURL+'NetworkAdmin/AddPurchaseRequest',req,{'headers':header});
   }

}
