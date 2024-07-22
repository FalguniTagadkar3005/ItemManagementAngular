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

export interface addOrEditUserRequest
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
    role:string;
}
