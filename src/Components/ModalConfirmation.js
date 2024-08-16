import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import iconOrderConfirmed from "../assets/images/icon-order-confirmed.svg";
import ReactDOM from "react-dom";

function ModalConfirmation({ isOpen, onClose, onConfirm, cartItems }) {
  const { getTotal } = useContext(CartContext);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl px-8 py-5 relative w-[90%] max-w-lg">
        <img src={iconOrderConfirmed} alt="iconOrded" className="mb-5" />
        <h3 className="font-bold text-3xl text-rose-900 mb-3">
          Order Confirmed
        </h3>
        <p className="text-rose-400 text-sm">We hope you enjoy your food!</p>
        <ul className="my-6 bg-rose-100 p-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-row items-center border-b-2 py-2"
            >
              <div className="w-[15%] mr-3">
                <img
                  src={item.image.desktop}
                  className="rounded-md"
                  alt="ImageProduct"
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-rose-900 font-bold">{item.name}</span>
                <div className="flex flex-row gap-3">
                  <span className="text-red font-bold">{item.quantity}x</span>
                  <span className="text-rose-400">
                    @ ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="text-rose-500 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
          <div className="flex justify-between pt-4 items-center">
            <p className="text-rose-500 text-sm">Order Total</p>
            <b className="text-rose-900 text-[20px]">${getTotal()}</b>
          </div>
        </ul>
        <button
          className="w-full bg-red text-white rounded-full p-4 hover:brightness-75"
          onClick={onConfirm}
        >
          Start New Order
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalConfirmation;
