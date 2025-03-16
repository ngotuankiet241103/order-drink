import React, { useState } from "react";
import { menu } from "../types/store";

const Menu = ({ menu }: { menu: menu }) => {
  const [isToggle,setToggle] = useState(false);
  return (
    <div key={menu.category_id}>
      <div className="flex justify-between gap-2">
        <strong>{menu.name}</strong>
        <span className="cursor-pointer" onClick={() => setToggle(!isToggle)}>{isToggle ? "Hide" : "Show"}</span>
      </div>
      {isToggle && <ul>
        {menu.drinks.map((drink) => (
          <li key={drink.drink_id}>
            {drink.drink_name} - ${drink.price}{" "}
            {drink.size && `(${drink.size})`}
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default Menu;
