import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format-brl";

export default function Cart() {
  const { cartItems, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--primary-color)] text-[var(--primary-text-color)] border-t border-[var(--background-color)] shadow-lg cursor-pointer">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto"
      >
        <p className="flex items-center gap-2 font-semibold">
          Carrinho ({cartItems.total_items})
        </p>

        <span className="text-lg font-bold bg-[var(--background-color)] p-2 rounded-md text-green-600">
          {formatBRL(cartItems.total_price)}
        </span>
      </div>

      {isOpen && (
        <div className="max-h-64 overflow-y-auto border-t border-[var(--primary-color)] bg-[var(--background-color)] px-4 py-3">
          {cartItems.length === 0 ? (
            <p className="text-sm">Seu carrinho está vazio</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-[var(--background-color)] p-2 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm">
                      {formatBRL(item.price)} x {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-sm w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                  >
                    –
                  </button>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => {
                  // conclui o pedido e depois envia uma request para a api
                  alert("Pedido feito!")
                }}
                className="bg-[var(--primary-color)] w-full p-4 rounded-lg cursor-pointer"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
