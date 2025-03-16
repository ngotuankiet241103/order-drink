import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { order_drink } from '../../types/order'

export type orderDrinks = {order_drink?: order_drink[]}

const initialState: orderDrinks  = {
    
}

export const orderDrinkSlice = createSlice({
  name: 'orderDrink',
  initialState,
  reducers: {
   setOrderDrinks: (state,action: PayloadAction<order_drink[]>) => {
    console.log(action);
    
        state = {
            ...state,
            order_drink: action.payload
        }
        return state;
   }
    
  },
})

// Action creators are generated for each case reducer function
export const { setOrderDrinks } = orderDrinkSlice.actions

export default orderDrinkSlice.reducer