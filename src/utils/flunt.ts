export class Flunt {

    constructor(public errors: any[] = []) {

    }

    isRequired(value,message){
        if(!value || value.length <= 0){
            this.errors.push(message);
        }
    }

    hasMinLen = (value,min,message)=>{
        if(!value || value.length < min){
            this.errors.push(message);
        }
    }
    hasMaxLen = (value,max,message)=>{
        if(!value || value.length > max){
            this.errors.push(message);
        }
    }
    isFixedLen = (value,len,message) =>{
        if(value.length !== len){
            this.errors.push(message);
        }
    }
    isEmail = (value,message)=>{
        const reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!reg.test(value)){
            this.errors.push(message);
        }
    }
    isGreaterThan(value: number, fix: number, message: string){
        if(value <= fix)
            this.errors.push(message);
    }
    isLowerThan(value: number, fix: number, message: string){
        if(value >= fix)
            this.errors.push(message);
    }
    isValid(){
        return this.errors.length === 0;
    }
    clear(){
        this.errors = [];
    }
}