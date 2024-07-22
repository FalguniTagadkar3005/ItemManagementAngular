import { HttpStatusCode } from "@angular/common/http";

export interface apiResponse<dataBody>
{
    isSuccess:boolean;
    data:dataBody;
    statusCode:HttpStatusCode;
    message:string;
    errorMessages:string[];
}
export interface loginRequest{
    email : string,
    password : string
}

export interface forgotPasswordRequest
{
    email:string
}

export interface resetPasswordRequest
{
    newPassword:string
}

export interface userDetail
{
    userId:string
    name:string
    email:string
    role:string
    ro:string
}

export interface changePassword{
    oldPassword:string;
    password:string;
    confirmPassword:string;
}

// public string? Name { get; set; } 

// public string? Email { get; set; }

// public int RoleId { get; set; }

// public string RO { get; set; }

// public int PageNumber { get; set; }

// public int PageSize { get; set; }

// public string? SortingOn { get; set; }

// public int SortingWay { get; set; }


