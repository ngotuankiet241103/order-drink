import React, { useEffect, useState } from "react";
import { drink, menu } from "../types/store";

const Drink = ({ menu,onChange,drink: d }: { menu: menu[],onChange: (drink: drink) => void,drink: drink}) => {
  const [drink,setDrink] = useState( "")
  const menus = menu.filter(menu => menu.name.toLowerCase() != "topping")
  
  
  return (
    <div className="border block w-full text-center">
      <span className="block border-b">Drink</span>
      <select
        value={drink}
        onChange={(event) => {
         
          const arrIndexes  = event.target.value.split("-");
          const menuTarget = menu[Number(arrIndexes[0])];
         
          const drink = menuTarget.drinks[Number(arrIndexes[1])];
        
          onChange(drink)
         
          setDrink( event.target.value)
        }}
        className="text-white w-full p-2"
      >
        <option className="bg-black" value="" disabled>
          Select a drink
        </option>
        {menus.length > 0 &&
          menus.map((menu,i) => (
             <optgroup className="bg-gray-600" key={menu.category_id} label={menu.name}>
              {menu.drinks.map((drink,index) => <OptionDrink setDrink={setDrink} index={index} i={i} drink={drink} isSelected={d.drink_id === drink.drink_id}/>)}
            </optgroup>
          ))}
      </select>
    </div>
  );
};
const OptionDrink = ({drink,index,i,isSelected,setDrink}:
   {isSelected: boolean,drink: drink,index: number,i: number,setDrink: (value: string) => void}) => {
  useEffect(() => {
    if(isSelected){
      setDrink(`${i}-${index}`)
    }
  })
  return (
    <option   className="bg-black" key={`${i}-${index}`} value={`${i}-${index}`}>
                    {`${drink.drink_name} (${drink.size || ""}) - ${drink.price}`}
                  </option>
  )
}
export default Drink;
