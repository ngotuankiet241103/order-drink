import React, { useEffect } from 'react';
import Frame from './Frame';
import useOrder from '../hooks/useOrder';
import { NavLink } from 'react-router-dom';

const OrderPage = () => {
    const {orders,getOrders} = useOrder();
    useEffect(() => {
        getOrders();
    },[])
    return (
        <Frame>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Store</h1>
                <div className='flex justify-end mb-4'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        <NavLink to='/orders/new'>Add Order</NavLink>
                    </button>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Day</th>
                            <th className="py-2 px-4 border-b">Store name</th>
                            <th className="py-2 px-4 border-b">Total</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 &&  orders.map(order => (
                            <tr key={order.order_id}>
                                <td className="py-2 px-4 border-b">{order.order_id}</td>
                                <td className="py-2 px-4 border-b">{order.day.toString()}</td>
                                <td className="py-2 px-4 border-b">
                                  {order.store.name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {order.total}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <NavLink to={`/orders/detail/${order.order_id}`}>Edit</NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Frame>
    );
};

export default OrderPage;