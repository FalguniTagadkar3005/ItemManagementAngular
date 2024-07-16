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