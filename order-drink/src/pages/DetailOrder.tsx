import React, { useEffect, useState } from 'react';
import useOrder from '../hooks/useOrder';
import { useParams } from 'react-router-dom';
import { order } from '../types/order';
import useStore from '../hooks/useStore';
import Frame from './Frame';
import DetailOrderHeader from '../components/DetailOrderHeader';
import Drink from '../components/Drink';
import { menu } from '../types/store';
import Topping from '../components/Topping';
import DrinkOrder from '../components/DrinkOrder';
import useOrderDrink from '../hooks/useOrderDrink';
import ToppingRender from '../components/ToppingRender';
import { calcPrice } from '../utils/CalcPrice';

const DetailOrder = () => {
    const {order_id} = useParams();
    const {getStoreByOrderId,getMenuByStoreId} = useStore();
    const {getOrderById} = useOrder();
    const [curOrder,setOrder] = useState<order | null>();
    const [menus,setMenus] = useState<menu[]>([]);
    const [state,setState] = useState<{isAdd?: boolean,isEdit?: boolean}>({});
    const {orderDrinks,getOrderDrinkByOrderId} = useOrderDrink()
    useEffect( () => {
        const fetchOrder = async () => {
            if(!order_id) return;
            const order = await getOrderById(Number(order_id));
            const store = await getStoreByOrderId(order.store_id);
            order.store = store;
            setOrder(order);
        }
        
        
        fetchOrder();

    },[])
    useEffect(() => {
        const fetchMenu = async () => {
            if(!curOrder) return;
            const menu = await getMenuByStoreId(curOrder.store.id);
            setMenus(menu);
        }
        if(curOrder && order_id) {
            fetchMenu();
            getOrderDrinkByOrderId(Number(order_id))
        }
    },[curOrder])
    return (
        <Frame>
            {curOrder && (
                <>
                    <DetailOrderHeader curOrder={curOrder}/>
                    <div>
                        <div className='my-4 flex justify-between'>
                            <h1 className='font-bold text-4xl' >Order details</h1>
                            <div className='flex gap-2'>
                                <button onClick={() => setState({isAdd: !state.isAdd})} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Add drink
                                </button>
                            </div>
                        </div>
                        {state.isAdd && <DrinkOrder onClose={() => setState({isAdd: false})} menus={menus} isAdd={state.isAdd} />}
                        <div className='flex justify-around  border '>
                            <span className='border block w-full text-center'>Id</span>
                            <span className='border block w-full text-center'>User</span>
                            <span className='border block w-full text-center'>Drink</span>
                            <span className='border block w-full text-center'>Topping</span>
                            <span className='border block w-full text-center'>Note</span>
                            <span className='border block w-full text-center'>Price</span>
                        </div>
                        {orderDrinks && orderDrinks.map(orderDrink => <div className='flex justify-around  border'>
                            <span className='border block w-full text-center'>{orderDrink.id}</span>
                            <span className='border block w-full text-center'>{orderDrink.user_order}</span>
                            <span className='border block w-full text-center'>{orderDrink.primary_drink.drink_name + ` (${orderDrink.primary_drink.size})`}</span>
                            <span className='border block w-full text-center'>{orderDrink.topping && orderDrink.topping.map(t => <ToppingRender topping={t}/>)}</span>
                            <span className='border block w-full text-center'>{orderDrink.note}</span>
                            <span className='border block w-full text-center'>{calcPrice(orderDrink.primary_drink,orderDrink.topping)}</span>
                        </div>)}
                        <div></div>
                    </div>
                </>
                    
                )}

        </Frame>
    );
};

export default DetailOrder;