import { selectedItemForRequest } from "./developer";

export interface getAllPurchaseRequest
{
    invoiceNumber:string;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface getAllPurchaseRequestSingleResponse
{
    purchaseRequestId:number;
    date:Date;
    invoiceNumber:string;
}

export interface getAllPurchaseRequestResponse{
    records:getAllPurchaseRequestSingleResponse[];
    totalRecords:number;
}

export interface getAllDeveloperRequest
{
    requestNumberOrRequestor:string;
    statusId:number;
    requestType:number;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface developerRequestSingleResponse
{
    requestId:number;
    createdDate:Date;
    requestType:number;
    statusId:number;
    status:string;
    requestNumber:string;
    requestorName:string;
}

export interface getAllDeveloperRequestResponse
{
    records:developerRequestSingleResponse[];
    totalRecords:number;
}

export interface addPurchaseRequest
{
    items:selectedItemForRequest[];
}