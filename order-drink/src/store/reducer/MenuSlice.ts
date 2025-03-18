import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { order_drink } from '../../types/order'
import { menu } from '../../types/store'

export type menuDrinks = {menus?: menu[]}

const initialState: menuDrinks  = {
    
}

export const menuSlice = createSlice({
  name: 'menuDrink',
  initialState,
  reducers: {
   setMenus: (state,action: PayloadAction<menu[]>) => {
      console.log(action);
      
        state = {
            ...state,
            menus: action.payload
        }
        return state;
   }
    
  },
})

// Action creators are generated for each case reducer function
export const { setMenus } = menuSlice.actions

export default menuSlice.reducer