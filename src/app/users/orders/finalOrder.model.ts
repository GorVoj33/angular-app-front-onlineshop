import { Address } from './address.model'
import { User } from 'src/app/shared/register/user.model';
import { Product } from '../products/products.component';
import { OrdersComponent } from './orders.component';

export class FinalOrder{
    //constructor(){}
    address: Address;
    total : number;
    date : Date;
    paymentMethod : string;
    items : OrderItem[];
    user? : User;
    id? : number;
    constructor(address: Address,total:number, paymentMethod: string, items: OrderItem[], user? : User, id?: number){
        this.address = address;
        this.total = total;
        this.date = new Date();
        this.paymentMethod = paymentMethod;
        this.items = items;
        this.user = user;
        this.id= id;
    }

}

export class OrderItem{
    product: Product;
    quantity:number;
    total: number;
    finalOrder? : FinalOrder;
    id? : number;
    constructor(product: Product,items:number,total: number,order? : FinalOrder,id? : number){
        this.product = product;
        this.quantity = items;
        this.total = total;
        this.finalOrder = order;
        this.id = id;
    }
}
