import React, { useState } from 'react';
import { order_drink } from '../types/order';
import { supabase } from '../supabase/supabase-config';
import { useDispatch, useSelector } from 'react-redux';
import { state } from '../store/state';
import { setOrderDrinks } from '../store/reducer/OrderDrinkSlice';

const useOrderDrink = () => {
    const {order_drink: orderDrinks} = useSelector((state: state) => state.orderDink)
    const dispatch = useDispatch();
    const insertOrderDrink = async (orderDrink: order_drink) => {
        const order_drink = {
            user_order: orderDrink.user_order,
            note: orderDrink.note,
            primary_drink_id: orderDrink.primary_drink.drink_id,
            order_id: orderDrink.order_id
        }
         const { data, error } = await supabase
                            .from('order_drinks')
                            .insert([
                                order_drink,
                              ])
                              .select()
                            if (error) {
                                console.error('Error inserting store:', error);
                                return null;
                            }
        const topping =  await Promise.all(orderDrink.topping.map(async topping => {
           
            const {data: e} = await supabase.from("toppings")
            .insert([{total: topping.total,order_drink_id: data[0].id,drink_id: topping.drink.drink_id}])
            .select();
           
            return {
                ...topping,
                id: e[0].id
                
            }
            
        }))
        if(orderDrinks) {
            
            dispatch(setOrderDrinks([...orderDrinks,{...orderDrink,id: data[0].id,topping}]))
        }
             
    }
    const getOrderDrinkByOrderId = async (orderId: number) => {
        const {data} = await supabase.from("order_drinks")
        .select().eq("order_id",orderId);
        if(!data) {
            return []
        }
        const newData = await Promise.all(data.map(async val => {
            const {data: drink} = await supabase.from("drinks")
            .select().eq("drink_id",val.primary_drink_id)
            let {data: topping} =  await supabase.from("toppings")
            .select().eq("order_drink_id",val.id);
            if(topping){

                topping = await Promise.all(topping.map( async topping => {
                    const {data: drink} = await supabase.from("drinks")
                    .select().eq("drink_id",topping.drink_id);
                    
                    return !drink ? {
                        ...topping
                    } :  {
                        ...topping,
                        drink: drink[0]
                    }
                }))
            }
          

            return {
                ...val,
                primary_drink: drink ? drink[0] : null,
                topping 
            }
        }))
        console.log(newData);
        
        dispatch(setOrderDrinks(newData))
        
    }

    return {
        insertOrderDrink,
        getOrderDrinkByOrderId,
        orderDrinks
    }
};

export default useOrderDrink;