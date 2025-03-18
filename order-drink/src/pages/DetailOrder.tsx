import React, { useEffect, useRef, useState } from 'react';
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
import { supabase } from '../supabase/supabase-config';
import OrderItem from '../components/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { state } from '../store/state';
import { setMenus } from '../store/reducer/MenuSlice';
import html2canvas from "html2canvas-pro";
const DetailOrder = () => {
    const {order_id} = useParams();
    const {getStoreByOrderId,getMenuByStoreId} = useStore();
    const {getOrderById} = useOrder();
    const [curOrder,setOrder] = useState<order | null>();
    const { menus} = useSelector((state: state) => state.menuDrink)
    const [state,setState] = useState<{isAdd?: boolean,isEdit?: boolean}>({});
    const {orderDrinks,getOrderDrinkByOrderId} = useOrderDrink();
    const dispatch = useDispatch();
    const tableRef = useRef<HTMLDivElement>(null)
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
        const handleInserts = (payload: any) => {
           
            getOrderDrinkByOrderId(Number(order_id))
        }
        // Listen to inserts
        supabase
        .channel(`order-drink-${order_id}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order_drinks' }, handleInserts)
        .subscribe()

    },[])
    useEffect(() => {
        const fetchMenu = async () => {
            if(!curOrder) return;
            const menu : menu[] | null = await getMenuByStoreId(curOrder.store.id);
            console.log(menu);
            
             dispatch(setMenus(menu));
            console.log("!23");
            
        }
        if(curOrder && order_id) {
            fetchMenu();
            getOrderDrinkByOrderId(Number(order_id))
        }
    },[curOrder])
    const handleExport = async () => {
        const targetElement = tableRef.current;
  if (!targetElement) return;

  try {
    const canvas = await html2canvas(targetElement, {
      backgroundColor: '#fff', // Removes background if it's causing issues
      useCORS: true, // Helps with external images
    });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `order-${curOrder?.day}-${curOrder?.store.name}.png`;
    link.click();
  } catch (error) {
    console.error("Error capturing image:", error);
  }
        // if(!tableRef.current) return;
        // html2canvas(tableRef.current).then(canvas => {
        //     document.body.appendChild(canvas);
            // Not Working
            // const imgData = canvas.toDataURL("image/png");
            // window.open(imgData);
      
            //Not Working
            // canvas.toBlob(function(blob) {
            //   // Generate file download
            //   console.log(blob);
            //   window.open(blob, "_blank");
            // });
        //   });
    }
    return (
        <Frame>
            {curOrder && (
                <>
                    <DetailOrderHeader curOrder={curOrder}/>
                    <div>
                        <div className='my-4 flex justify-between'>
                            <h1 className='font-bold text-4xl' >Order details</h1>
                            <div className='flex gap-2'>
                                <button onClick={handleExport} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Export
                                </button>
                                <button onClick={() => setState({isAdd: !state.isAdd})} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Add drink
                                </button>
                            </div>
                        </div>
                        {state.isAdd && <DrinkOrder onClose={() => setState({isAdd: false})} menus={menus} isAdd={state.isAdd} />}
                        <div ref={tableRef} className='border border-gray-300 rounded-lg shadow-lg w-full max-w-lg"'>
                        <div className='flex justify-around  border '>
                            <span className='border block w-full text-center'>STT</span>
                            <span className='border block w-full text-center'>User</span>
                            <span className='border block w-full text-center'>Drink</span>
                            <span className='border block w-full text-center'>Topping</span>
                            <span className='border block w-full text-center'>Note</span>
                            <span className='border block w-full text-center'>Price</span>
                        </div>
                        {orderDrinks && orderDrinks.map((orderDrink,index) => <OrderItem orderDrink={orderDrink} index={index}/>)}
                        </div>
                    </div>
                </>
                    
                )}

        </Frame>
    );
};

export default DetailOrder;