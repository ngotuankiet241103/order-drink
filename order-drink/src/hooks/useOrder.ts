import React, { useState } from 'react';
import { order, order_drink } from '../types/order';
import { supabase } from '../supabase/supabase-config';
import useStore from './useStore';

const useOrder = () => {
    const [orders,setOrder] = useState<order[]>([]);
    const {getStoreByOrderId} = useStore();
    const insertOrder = async (order: order) => {
        const { data, error } = await supabase
                    .from('orders')
                    .insert([
                        { store_id: order.store.id, total: 0, day: order.day},
                      ])
                      .select()
                    if (error) {
                        console.error('Error inserting store:', error);
                        return null;
                    }
        return data[0];
    }
    const getOrders = async () => {
        const { data } = await supabase.from('orders').select();
        if (!data) return [];
        console.log(data);
        
        const newData = await Promise.all(data.map(async (order: any) => {
            
            const store = await getStoreByOrderId(order.store_id);
            return {
                order_id: order.order_id,
                store: store,
                total: order.total,
                day: order.day
            }
        }));
        console.log(newData);
        
        setOrder(newData as order[]);
    }
    const getOrderById = async (id: number) => {
        const { data } = await supabase.from('orders').select()
        .eq("order_id",id);
        return !data ?  null : data[0]; 

    }
    
    return {
        orders,
        insertOrder,
        getOrders,
        getOrderById
    }
};

export default useOrder;