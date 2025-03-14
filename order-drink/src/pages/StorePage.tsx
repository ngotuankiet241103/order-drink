import React from 'react';
import { store } from '../types/store';
import Frame from './Frame';
import { NavLink } from 'react-router-dom';

const StorePage = () => {
    // Sample data for the table
    const stores: store[] = [
        { id: 1, name: 'Store 1', menu: [
            { category_id: '1', name: 'Menu 1', drinks: [
                { drink_id: '1', name: 'Drink 1', price: '5.00', size: 'Small' },
                { drink_id: '2', name: 'Drink 2', price: '6.00', size: 'Medium' },
                { drink_id: '3', name: 'Drink 3', price: '7.00', size: 'Large' }
            ]},
            { category_id: '2', name: 'Menu 2', drinks: [
                { drink_id: '4', name: 'Drink 4', price: '5.50', size: 'Small' },
                { drink_id: '5', name: 'Drink 5', price: '6.50', size: 'Medium' }
            ]}
        ]},
        { id: 2, name: 'Store 2', menu: [
            { category_id: '3', name: 'Menu 3', drinks: [
                { drink_id: '6', name: 'Drink 6', price: '5.00', size: 'Small' },
                { drink_id: '7', name: 'Drink 7', price: '6.00', size: 'Medium' }
            ]},
            { category_id: '4', name: 'Menu 4', drinks: [
                { drink_id: '8', name: 'Drink 8', price: '7.00', size: 'Large' },
                { drink_id: '9', name: 'Drink 9', price: '8.00', size: 'Medium' }
            ]}
        ]},
        { id: 3, name: 'Store 3', menu: [
            { category_id: '5', name: 'Menu 5', drinks: [
                { drink_id: '10', name: 'Drink 10', price: '5.00', size: 'Small' },
                { drink_id: '11', name: 'Drink 11', price: '6.00', size: 'Medium' }
            ]},
            { category_id: '6', name: 'Menu 6', drinks: [
                { drink_id: '12', name: 'Drink 12', price: '7.00', size: 'Large' },
                { drink_id: '13', name: 'Drink 13', price: '8.00', size: 'Medium' }
            ]}
        ]}
    ];

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
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store => (
                            <tr key={store.id}>
                                <td className="py-2 px-4 border-b">{store.id}</td>
                                <td className="py-2 px-4 border-b">{store.name}</td>
                                <td className="py-2 px-4 border-b">
                                    {store.menu.map(menu => (
                                        <div key={menu.category_id}>
                                            <strong>{menu.name}</strong>
                                            <ul>
                                                {menu.drinks.map(drink => (
                                                    <li key={drink.drink_id}>
                                                        {drink.name} - ${drink.price} {drink.size && `(${drink.size})`}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Frame>
    );
};

export default StorePage;