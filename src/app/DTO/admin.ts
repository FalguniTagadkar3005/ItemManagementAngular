export interface allUsersRequest
{
    nameOrEmail:string;
    roleId:number;
    pageNumber:number;
    pageSize:number;
    sortingOn:string|null;
    sortingWay:number;
}

export interface allUsersResponse
{
    userId:number;
    name:string;
    email:string;
    role:string;
}

export interface allUsersResponseWithCount
{
    records:allUsersResponse[];
    totalRecords:number;
}

export interface addUserRequest
{
    name:string;
    email:string;
    password:string;
    roleId:number;
    roId:number;
}

export interface userResponse
{
    userId:number;
    name:string;
    email:string;
    roleId:number;
}

export interface editUserRequest
{
    name:string;
    email:string;
    roleId:number;
    roId:number;
}


export interface allItemTypesRequest
{
    name:string;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface ItemTypesResponse
{
    itemTypeId:number;
    name:string;
    description:string;
}

export interface allItemTypesResponseWithCount
{
    records:ItemTypesResponse[];
    totalRecords:number;
}

export interface addOrEditItemTypeRequest
{
    name:string;
    description:string|null;
}

export interface itemTypesForDropdown
{
    itemTypeId:number;
    name:string;
}

export interface allItemsRequest
{
    name:string;
    itemTypeId:number;
    pageNumber:number;
    pageSize:number;
    sortingOn:string;
    sortingWay:number;
}

export interface ItemResponse
{
    itemId:number;
    name:string;
    itemType:string;
    itemTypeId:number;
    description:string;
    quantity:number;
}

export interface allItemsResponseWithCount
{
    records:ItemResponse[];
    totalRecords:number;
}

export interface addItemRequest
{
    name:string;
    itemTypeId:number;
    description:string;
    quantity:number;
}