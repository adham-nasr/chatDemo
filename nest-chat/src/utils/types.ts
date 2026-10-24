import { Request } from "express";

export interface AuthenticationRequest extends Request{
    user?:JwtPayload
}

export interface JwtPayload {
    userId:string,
    username:string
}