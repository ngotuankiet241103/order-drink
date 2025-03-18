import { configureStore } from '@reduxjs/toolkit'

import  OrderDrinkSlice from './reducer/OrderDrinkSlice'
import  MenuSlice from './reducer/MenuSlice'
import { state } from './state'

export const store = configureStore<state>({
  reducer: {
    orderDink: OrderDrinkSlice,
    menuDrink: MenuSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch