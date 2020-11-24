export class BaseModel{

    constructor() { }

    public toJson(){
        return JSON.stringify(this);
    }

}