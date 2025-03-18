import React, { useEffect, useState } from 'react';
import { menu } from '../types/store';
import { topping } from '../types/order';
import ToppingRender from './ToppingRender';

const Topping = ({ menu,topping,onChange }: { menu?: menu,topping?: topping[],onChange: (topping: topping[]) => void }) => {
    const [selectedToppings, setSelectedToppings] = useState<{ [key: number]: number }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCheckboxChange = (drinkId: number) => {
        setSelectedToppings((prevSelectedToppings) => {
            const newSelectedToppings = { ...prevSelectedToppings };
            if (newSelectedToppings[drinkId]) {
                delete newSelectedToppings[drinkId];
            } else {
                newSelectedToppings[drinkId] = 1;
            }
            return newSelectedToppings;
        });
    };

    const handleCountChange = (drinkId: number, count: number) => {
        setSelectedToppings((prevSelectedToppings) => ({
            ...prevSelectedToppings,
            [drinkId]: count,
        }));
    };
    console.log(selectedToppings);
    useEffect(() => {
        if(Object.keys(selectedToppings).length > 0){
            const toppings : topping[]= Object.keys(selectedToppings).map(index => {
               return {
                drink: menu?.drinks[Number(index)],
                total: selectedToppings[Number(index)]
               }
            })
            onChange(toppings)
        }
         
    },[selectedToppings])
    useEffect(() => {
        if(topping){
            const toppings = topping.reduce((prev,topping) => {
                const index = menu?.drinks.findIndex(drink => topping.drink.drink_id === drink.drink_id)
                return index ?   {
                    ...prev,
                    [index]: topping.total
                } : {
                    ...prev
                }
            },{})
            setSelectedToppings(toppings)
        }

    },[])
    return (
        <div className='border block w-full text-center'>
           <span className="block border-b">Topping</span>
           <div className='px-4'>
           {selectedToppings && <div>
            {topping &&  topping.map(t => {
                return (
                    <ToppingRender topping={t}/>
                )
            })}
            </div>}
           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">
                {Object.keys(selectedToppings).length > 0 ? 'Change' : 'Select'} Toppings
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <span className="block border-b mb-4">Topping</span>

                {menu && menu.drinks.map((drink,index) => (
                    <div key={drink.drink_id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={drink.drink_id}
                            checked={!!selectedToppings[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={drink.drink_id} className="ml-2">
                            {drink.drink_name}
                        </label>
                        {selectedToppings[index] && (
                            <input
                                type="number"
                                min="1"
                                value={selectedToppings[index]}
                                onChange={(e) => handleCountChange(index, parseInt(e.target.value))}
                                className="ml-2 w-16"
                            />
                        )}
                    </div>
                ))}
            </Modal>
           </div>
        </div>
    );
};
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className= "p-4 rounded shadow-lg w-1/2">
                <button className="absolute top-2 right-2" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};
export default Topping;