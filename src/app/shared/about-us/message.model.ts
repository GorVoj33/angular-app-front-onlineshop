export class Message{
    email:string;
    name:string;
    message:string;
    date:Date;
    id? : number;

    constructor(email:string,name:string,message:string,id?:number){
        this.email=email;
        this.name=name;
        this.message=message;
        this.date=new Date();
        this.id=id;
    }
}