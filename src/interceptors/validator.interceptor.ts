import { NestInterceptor, Injectable, ExecutionContext, HttpException, HttpStatus, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { ModelContract } from "src/backoffice/contracts/model.contract";
import { ResultModel } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: ModelContract) {

    }

    intercept(context: ExecutionContext, call$: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(new ResultModel('Ops, algo saiu errado', false, null, this.contract.errors), HttpStatus.BAD_REQUEST);
        }

        return call$.handle();
    }
}