import React from "react";
import CartShop from "../../assets/images/icon-add-to-cart.svg";
import { ReactComponent as IconDecrement } from "../../assets/images/icon-decrement-quantity.svg";
import { ReactComponent as IconIncrement } from "../../assets/images/icon-increment-quantity.svg";

function Button({ click, quantity, onIncrement, onDecrement, onAddToCart  }) {
  
  return (
    <div className="absolute bottom-[-20px] w-[65%]">
      {!click ? (
        <button
          className="flex flex-row items-center gap-2  border-2 border-rose-300 rounded-full 
            py-2 px-5 bg-white font-bold text-rose-900 text-xs w-full justify-center"
            onClick={onAddToCart}
        >
          <img src={CartShop} alt="carShop"></img>Add to Cart
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-between gap-2 rounded-full 
            py-[10px] px-2 bg-red font-bold text-white text-xs w-full"
        >
          <IconDecrement
            className="border rounded-full w-4 h-4 flex items-center justify-center hover:bg-white
              hover:text-red p-[3px]"
              onClick={onDecrement}
          />
          <span className="font-normal">{quantity}</span>
          <IconIncrement
            className="border rounded-full w-4 h-4 flex items-center justify-center hover:bg-white
              hover:text-red p-[3px]"
              onClick={onIncrement}
          />
        </button>
      )}
    </div>
  );
}

export default Button;
