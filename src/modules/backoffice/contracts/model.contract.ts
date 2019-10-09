export interface ModelContract{
    errors: any[];
    validate(model: any): boolean;
}