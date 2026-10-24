import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction , Request , Response} from "express";
import { UsersRepository } from "src/users/users.repository";
import type { AuthenticationRequest } from "src/utils/types";
import { verifyToken } from "src/utils/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(){}
  async use(req: AuthenticationRequest, res: Response, next: NextFunction) {
     try{
        console.log("JELLOOO !")
        const {authorization} = req.headers
        const token = authorization?.split(" ")[1]
        console.log(token)
        if(!token)
            throw new UnauthorizedException("Token Not Found")
        try{
            const payload = verifyToken(token || "");
            req.user = payload;
            next()
        }
        catch(error)
        {
            throw new UnauthorizedException("Invalid Token")

        }
    }catch(e){
        throw new UnauthorizedException("UnAuthenticated")
    }
  }
}