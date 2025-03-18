import React, { useState } from "react";
import { order_drink } from "../types/order";
import { calcPrice } from "../utils/CalcPrice";
import ToppingRender from "./ToppingRender";
import DrinkOrder from "./DrinkOrder";
import { useSelector } from "react-redux";
import { state } from "../store/state";

const OrderItem = ({
  orderDrink,
  index,
}: {
  orderDrink: order_drink;
  index: number;
}) => {
  const [isEdit, setEdit] = useState(false);
  const {menus} = useSelector((state: state) => state.menuDrink)
  console.log(menus);
  
  return (
    <>
    {isEdit && menus ? <DrinkOrder menus={menus}  order_drink={orderDrink} isAdd={false} onClose={() => setEdit(!isEdit)} /> : <div className="flex justify-around  border" onDoubleClick={() => setEdit(!isEdit)}>
    <span className="border block w-full text-center">{index}</span>
    <span className="border block w-full text-center">
      {orderDrink.user_order}
    </span>
    <span className="border block w-full text-center">
      {orderDrink.primary_drink.drink_name +
        ` (${orderDrink.primary_drink.size})`}
    </span>
    <span className="border block w-full text-center">
      {orderDrink.topping &&
        orderDrink.topping.map((t) => <ToppingRender topping={t} />)}
    </span>
    <span className="border block w-full text-center">{orderDrink.note}</span>
    <span className="border block w-full text-center">
      {calcPrice(orderDrink.primary_drink, orderDrink.topping)}
    </span>
  </div>}
    </>
  );
};

export default OrderItem;
