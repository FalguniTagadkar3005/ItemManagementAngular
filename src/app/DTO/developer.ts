export interface allrequestRequest
{
    requestNumber:string;
    statusId:number;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface request
{
    requestId:number;
    date:Date;
    statusId:number;
    status:string;
    requestNumber:string;
}

export interface allRequestWithCount
{
    records:request[];
    totalRecords:number;
}

export interface allItemRequestDev
{
    name:string;
    itemTypeId:number;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface itemResponseDev
{
    itemId:number;
    name:string;
    itemType:string;
    itemTypeId:number;
    description:string;
}

export interface allItemsResponseWithCountDev
{
    records:itemResponseDev[];
    totalRecords:number;
}

export interface itemsForDropdown
{
    itemId:number;
    name:string;
}

export interface selectedItemForRequest
{
    itemId:number;
    quantity:number;
}

export interface displayItemForRequest
{
    name:string;
    itemType:string;
    quantity:number;
}

export interface addRequest
{
    items:selectedItemForRequest[];
    submit:boolean;
}