import { topping } from "../types/order";
import { drink } from "../types/store";

export const calcPrice = (drink?: drink,topping?: topping[]) => {
    let price : number = 0 ;
        if(drink){
            price  += Number(drink?.price)
        }
        if(topping && topping.length > 0){
            price += topping.reduce((prev,val) => prev + (Number(val.drink.price) * val.total),0)
        }
        return price;
}