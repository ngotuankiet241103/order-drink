import React, { useState } from 'react';
import { menu, store } from '../types/store';
import { supabase } from '../supabase/supabase-config';
const STORE_KEY  = 'store';
const useStore = (page: number = 1,limit: number = 10) => {
    const json = localStorage.getItem(STORE_KEY);
    const [stores,setStores] = useState<store[]>([]);
    const insertStore = async (store: store) => {
        const { data, error } = await supabase
            .from('stores')
            .insert([
                { name: store.name, image: store.image},
              ])
              .select()
            if (error) {
                console.error('Error inserting store:', error);
                return null;
            }
            console.log(data);
        store.menu.forEach(async (menu) => {
            const { data: storeData, error } = await supabase.from('menus').insert([
                { store_id: data[0].id, name: menu.name}
                ]).select()
            if (error) {
                console.error('Error inserting menu:', error);
                return null;
            }
            menu.drinks.forEach(async (drink) => {  
                const { data, error } = await supabase.from('drinks').insert([
                    { menu_id: storeData[0].category_id, drink_name: drink.drink_name, price: drink.price, size: drink.size}
                    ]).select()
                if (error) {
                    console.error('Error inserting drink:', error);
                    return null;
                }
            })
        })
        return data;
    }
    const addStore = (store: store) => {
        const newStores = [...stores, store];
        setStores(newStores);
        localStorage.setItem(STORE_KEY, JSON.stringify(newStores));
    }
    const getStores = async () => {
        const { data } = await supabase.from('stores').select();
        if (!data) return [];
        const newData = await Promise.all(data.map(async (store: any) => {
            const { data: menus } = await supabase.from('menus').select("*").eq('store_id', store.id);
            const menuData = await Promise.all(menus.map(async (menu: any) => {
                const { data: drinks } = await supabase.from('drinks').select("*").eq('menu_id', menu.category_id);
                return {
                    category_id: menu.id,
                    name: menu.name,
                    drinks: drinks
                };
            }));
            return {
                id: store.id,
                name: store.name,
                image: store.image,
                menu: menuData
            };
        }));
        setStores(newData as store[]);
        localStorage.setItem(STORE_KEY, JSON.stringify(newData));
        return newData;
    }
  
    const getStoreByOrderId = async (orderId: number) => {
        const { data } = await supabase.from('stores').select("*").eq('id', orderId);
        if(!data) return null;
        return data[0]
    }
    const getAllStores = async () => {
        const { data } = await supabase.from('stores').select();
        if (!data) return [];
        setStores(data as store[]);
    }
    const getMenuByStoreId = async (storeId: number) => {
        const { data: menus } = await supabase.from('menus').select("*").eq('store_id', storeId);
        if (!menus) return [];
        const menuData = await Promise.all(menus.map(async (menu: any) => {
            const { data: drinks } = await supabase.from('drinks').select("*").eq('menu_id', menu.category_id);
            return {
                category_id: menu.category_id,
                name: menu.name,
                drinks: drinks
            };
        }));
        return menuData;
    }
    return {
        stores,
        addStore,
        insertStore,
        getStores,
        getStoreByOrderId,
        getAllStores,
        getMenuByStoreId
    }
};

export default useStore;