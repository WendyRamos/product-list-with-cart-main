import React, { useContext } from "react";
import { CartContext } from '../CartContext';
import Button from "./Button";

function CardProduct() {
  const { data, quantities, handleIncrement, handleDecrement, handleAddToCart } = useContext(CartContext);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%] max-sm:w-full">
        <h2 className="font-bold text-4xl text-rose-900 mb-4  sm:col-span-2 lg:col-span-3">
          Desserts
        </h2>
        {data.map((item, index) => (
          <div key={item.id}>
            <div className="relative flex justify-center items-end">
              <img
                className={`max-sm:hidden rounded-lg ${
                  quantities[index] >= 1 ? "border-red border-2" : ""
                }`}
                src={item.image.desktop}
                alt={item.name}
              />
              <img
              className={`sm:hidden rounded-lg ${
                quantities[index] >= 1 ? "border-red border-2" : ""
              }`}
              src={item.image.mobile}
              alt={item.name}
              />
              <Button
                click={quantities[index] >=1}
                quantity={quantities[index]}
                onIncrement={() => handleIncrement(index)}
                onDecrement={() => handleDecrement(index)}
                onAddToCart={() => handleAddToCart(index)}
              ></Button>
            </div>
            <div className="mt-6">
              <span className="text-rose-400 text-xs">{item.category}</span>
              <h3 className="text-rose-900 font-bold">{item.name}</h3>
              <p className="text-red font-bold">$ {item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
  );
}

export default CardProduct;
