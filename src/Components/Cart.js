import React from "react";
import { CartProvider } from "./CartContext"; 
import CardProduct from "./CardProducts/CardProduct";
import CardCart from "./CardCart";

function Cart() {
  return (
  <CartProvider>
    <div className="lg:w-[95%] xl:w-[80%] flex flex-row items-start gap-6 p-2 py-10 max-sm:flex-col">
      <CardProduct/>
      <CardCart/>
    </div>
  </CartProvider>
  );
}

export default Cart;
