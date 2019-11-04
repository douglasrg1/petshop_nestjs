import {LoggerService} from '@nestjs/common';

export class CustomLogger implements LoggerService{
    error(message: any, trace?: string, context?: string) {
        console.log(message);
    }
    warn(message: any, context?: string) {
        throw new Error("Method not implemented.");
    }
    debug?(message: any, context?: string) {
        throw new Error("Method not implemented.");
    }
    verbose?(message: any, context?: string) {
        throw new Error("Method not implemented.");
    }
    log(message: string){}
}