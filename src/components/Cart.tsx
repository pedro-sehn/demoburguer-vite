import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format-brl";

export default function Cart() {
  const { cartItems, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[var(--primary-color)] shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-semibold"
        >
          Carrinho ({cartItems.total_items})
        </button>

        <span className="text-lg font-bold text-green-600">
          {formatBRL(cartItems.total_price)}
        </span>

        {cartItems.length > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Finalizar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="max-h-64 overflow-y-auto border-t border-[var(--primary-color)] bg-zinc-50 px-4 py-3">
          {cartItems.length === 0 ? (
            <p className="text-sm">Seu carrinho está vazio</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm">
                      {formatBRL(item.price)} x {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-sm w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    –
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
