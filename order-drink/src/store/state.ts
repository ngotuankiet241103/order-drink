

import { menuDrinks } from "./reducer/MenuSlice"
import { orderDrinks } from "./reducer/OrderDrinkSlice"

export type state = {
    orderDink: orderDrinks
    menuDrink: menuDrinks

}