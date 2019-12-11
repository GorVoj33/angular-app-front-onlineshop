import { Product } from '../products/products.component';


export class CartItem{
    itemId: number;
    countProducts:number;
    product: Product;
    total: number;
    constructor(
    itemId: number,
	countProducts:number,
    product: Product,
    total: number
    ){
        this.itemId =itemId;
        this.countProducts = countProducts;
        this.product = product;
        this.total = total;
    }
    // public getCountProducts():number{
    //     return this.countProducts;
    // }
    // get countProducts():number {
    //     return this.countProducts;
    // }
    // get total():number {
    //     return this.total;
    // }
    // get product():Product {
    //     return this.product;
    // }
    // get itemId():number {
    //     return this.itemId;
    // }
    
}

export class Cart {
    id:number;
    total: number;
    itemsNumber: number;
    items: CartItem[];
    constructor(  id:number, total: number,  itemsNumber: number, items: CartItem[]){
        this.id=id;
        this.total=total;
        this.itemsNumber = itemsNumber;
        this.items = items;
    } 
    setTotal(total:number){
        this.total = total;
    }
    setNumber(num:number){
        this.itemsNumber=num;
    }
}