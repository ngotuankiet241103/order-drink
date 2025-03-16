import { drink, store } from "./store"

export type order = {
    day: Date,
    order_id?: number,
    store: store,
    total: number,

}
export type order_drink = {
    id?: number
    user_order: string,
    order_id: number,
    primary_drink: drink,
    topping: topping[],
    note: string
}
export type topping = {
    id?: number
    order_drink_id: number;
    drink: drink;
    total: number;
}
