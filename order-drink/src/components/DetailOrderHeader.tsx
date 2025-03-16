import React from 'react';
import { order } from '../types/order';

const DetailOrderHeader = ({curOrder}: {curOrder: order}) => {
    const [imageTarget,setImageTarget] = React.useState('');
    return (
        <>
        <div className='w-full flex justify-between gap-2'>
                    <span>Order ID: {curOrder.order_id}</span>
                    <span>Day: {curOrder.day.toString()}</span>
                    <span>Store: 

                        <span className='cursor-pointer hover:opacity-70' onClick={() => setImageTarget(curOrder.store.image)}>{curOrder.store.name}</span>
                    </span>
                    <span>Total: {curOrder.total}</span>
                    </div>
                    {imageTarget && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center' onClick={() => setImageTarget('')}>
                <img src={imageTarget
                } alt="store" className="w-[120vh]" />
                </div>}    
        </>
    );
};

export default DetailOrderHeader;