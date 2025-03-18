import React, { useEffect, useState } from "react";
import { order_drink, topping } from "../types/order";
import Drink from "./Drink";
import Topping from "./Topping";
import { drink, menu } from "../types/store";
import { useParams } from "react-router-dom";
import useOrderDrink from "../hooks/useOrderDrink";
import { calcPrice } from "../utils/CalcPrice";

const DrinkOrder = ({
  order_drink,
  isAdd,
  menus,
  onClose
}: {
  order_drink?: order_drink;
  menus: menu[]
  isAdd: boolean;
  onClose: () => void
}) => {
  console.log(order_drink);
  
  const {order_id} = useParams();
  const [user,setUser] = useState(order_drink?.user_order);
  const [drink, setDrink] = useState(order_drink?.primary_drink);
  const [topping,setTopping] = useState(order_drink?.topping);
  const [price,setPrice] = useState<number>(calcPrice(order_drink?.primary_drink,order_drink?.topping));
  const [note,setNote] = useState(order_drink?.note);
  const {insertOrderDrink} = useOrderDrink()
  const handleChangeDrink = (drink: drink) => {
    setDrink(drink)
  }
  const handleChangeTopping = (topping: topping[]) => {
    setTopping(topping)
  }
  useEffect(() => {
    if(drink || topping ){
        
        
        setPrice(calcPrice(drink,topping))

    }
  } ,[drink,topping]);
  const handleSave = async () => {
    if(!drink || !topping || !user || !order_id){
      return;
    }
    const order_drink: order_drink = {
      order_id: Number(order_id),
      user_order: user,
      primary_drink: drink,
      topping,
      note
    }
    insertOrderDrink(order_drink)
    onClose();
    
  }
  return (
    <div>
      <div className="flex justify-around  border ">
        <div className="border block w-full text-center">
          <span className="border-b block ">User</span>
          <input
            onChange={(e) => setUser(e.target.value.trim())}
            type="text"
            defaultValue={user}
            className="px-2 w-full border-none outline-none text-left"
          />
        </div>
        <Drink drink={drink} onChange={handleChangeDrink} menu={menus} />
        <Topping
        topping={topping}
        onChange={handleChangeTopping}
          menu={menus.find((menu) => menu.name.toLowerCase() === "topping")}
        />
        <div className="border block w-full text-center">
          <span className="border-b block">Note</span>
          <input
            onChange={(e) => setNote(e.target.value.trim())}
            type="text"
            defaultValue={note}
            className=" px-2 w-full border-none outline-none text-left"
          />
        </div>
        <div className="border block w-full text-center">
          <span className="border-b block ">Price</span>
          <span>{price}</span>
        </div>
      </div>
      <div className="flex justify-end">
      <button type="button" onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isAdd ? 'Add drink' : 'Save change' }
      </button>
      </div>
    </div>
  );
};

export default DrinkOrder;
