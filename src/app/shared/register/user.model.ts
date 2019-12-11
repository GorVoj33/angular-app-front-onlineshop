import { Cart } from 'src/app/users/carts/carts.model';

export class User {
    password: string;
    email : string;
    name: string;
    isAdmin: boolean;
    id?: number;
    cart? :Cart;
    constructor (password: string, isAdmin: boolean, email: string, name: string,id?:number,cart? :Cart){
        this.password=password;
        this.email=email;
        this.isAdmin=isAdmin;
        this.name=name;
        this.id=id;
        this.cart=cart;
    }
    
    
  }