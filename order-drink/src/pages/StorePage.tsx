import React, { use, useEffect, useState } from 'react';
import { store } from '../types/store';
import Frame from './Frame';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import Menu from '../components/Menu';

const StorePage = () => {
    const {stores,getStores} = useStore();
    useEffect(() => {
        getStores();
    },[]);
    const [imageTarget, setImageTarget] = useState<string>('');
    return (
        <Frame>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Store</h1>
                <div className='flex justify-end mb-4'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        <NavLink to='/stores/new'>Add Store</NavLink>
                    </button>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2  border-b">ID</th>
                            <th className="py-2  border-b">Name</th>
                            <th className="py-2  border-b">Image</th>
                            <th className="py-2  border-b">Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.length > 0 &&  stores.map(store => (
                            <tr key={store.id}>
                                <td className="py-2 px-4 border-b">{store.id}</td>
                                <td className="py-2 px-4 border-b">{store.name}</td>
                                <td className="py-2 px-4 border-b">
                                    <img  src={store.image} alt={store.name} className="w-100 cursor-pointer hover:opacity-80 transition-all" onClick={() => setImageTarget(store.image)} />
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {store.menu.map(menu => (
                                        <Menu key={menu.category_id} menu={menu} />     
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {imageTarget && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center' onClick={() => setImageTarget('')}>
                <img src={imageTarget
                } alt="store" className="w-[120vh]" />
                </div>}
        </Frame>
    );
};

export default StorePage;