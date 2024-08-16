import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import EmptyImage from "../assets/images/illustration-empty-cart.svg";
import RemoveItems from "../assets/images/icon-remove-item.svg";
import CarbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import ModalConfirmation from "./ModalConfirmation";

function CardCart() {
  const { cartItems, removeFromCart, clearCart, getTotal, getTotalProduct } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmOrder = () => {
    clearCart();
    setIsModalOpen(false);
  }

  return (
    <div className="bg-white p-5 rounded-lg w-80 max-sm:w-full">
      <h3 className="font-bold text-red text-2xl">Your Cart ({getTotalProduct()})</h3>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={EmptyImage} alt="Empty cart" className="m-6" />
          <p className="text-rose-500 font-bold text-xs">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center border-b-2 my-2 pb-2">
              <li key={item.id} className="flex flex-col">
                <span className="text-rose-900 font-bold">{item.name}</span>
                <div className="flex flex-row gap-3">
                  <span className="text-red font-bold">{item.quantity}x</span>
                  <span className="text-rose-400">
                    @ ${item.price.toFixed(2)}
                  </span>
                  <span className="text-rose-500 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
              <button onClick={() => removeFromCart(item.id)}>
                <img
                  src={RemoveItems}
                  alt="Remove items"
                  className="rounded-full border-rose-300 border-2 p-1 hover:border-rose-500"
                />
              </button>
            </div>
          ))}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-rose-500 text-sm">Order Total</p>
              <b className="text-rose-900 text-[20px]">${getTotal()}</b>
            </div>
            <div className="flex flex-row justify-center bg-rose-50 my-3 px-2 py-3 rounded-lg">
              <img src={CarbonNeutral} alt="Carbon Neutral" className="pr-1" />
              <p className="text-sm text-rose-500">
                This is a <b className="text-rose-900">carbon-neutral</b>{" "}
                delivery
              </p>
            </div>
            <button className="bg-red text-white rounded-full my-3 py-3 hover:brightness-75" onClick={() => setIsModalOpen(true)}>
              Confirm Order
            </button>
            <ModalConfirmation 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm = {handleConfirmOrder}
            cartItems= {cartItems}
            />
          </div>
        </ul>
      )}
    </div>
  );
}

export default CardCart;
