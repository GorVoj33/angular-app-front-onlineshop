import { User } from "src/app/shared/register/user.model";

export class Address{
    address:string;
    city :string;
    contact:string;
    user?:User;
    constructor(
        address:string,
        city:string,
        contact: string,
        user?: User
    ){
        this.address=address;
        this.city=city;
        this.contact=contact;
        this.user=user;
    }
    // get city():string{
    //     return this.city;
    // }
    // get address():string{
    //     return this.address;
    // }
    // get contact():string{
    //     return this.contact;
    // }
}