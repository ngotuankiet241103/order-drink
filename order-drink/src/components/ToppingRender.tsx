import React from "react";
import { topping } from "../types/order";

const ToppingRender = ({ topping: t }: { topping: topping }) => {
  return (
    <div className="flex gap-2">
      <span>
        {t.drink.drink_name} - SL: {t.total}
      </span>
    </div>
  );
};

export default ToppingRender;
