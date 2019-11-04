import { Injectable, NestInterceptor, HttpException, HttpStatus } from "@nestjs/common";
import { JwtPayLoad } from "../interfaces/jwt-payload.interface";
import { ResultModel } from "../../modules/backoffice/models/result.model";


@Injectable()
export class RoleInterceptor implements NestInterceptor{

    constructor(public roles: string[]){}

    intercept(context: import("@nestjs/common").ExecutionContext, next: import("@nestjs/common").CallHandler<any>): import("rxjs").Observable<any> | Promise<import("rxjs").Observable<any>> {
        const payload: JwtPayLoad = context.switchToHttp().getRequest().user;

        let hasRole = false;
        payload.roles.forEach((role)=>{
            if(this.roles.includes(role))
                hasRole = true;
        })

        if(!hasRole){
            throw new HttpException(new ResultModel('Acesso não autorizado',false,null,null),
                HttpStatus.FORBIDDEN);
        }

        return next.handle();
    }

}