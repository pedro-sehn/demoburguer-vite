import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format-brl";
import type { EstablishmentData } from "../types/establishment";

export default function Cart() {
  const [establishmentData, setEstablishmentData] =
    useState<EstablishmentData | null>(null);

  useEffect(() => {
    async function getEstablishmentData() {
      try {
        const res = await fetch(
          "https://demoburger.stbl.com.br/core/v2/app/store/config/?format=json&app_variant=mobile"
        );
        const data: EstablishmentData = await res.json();

        if (!data.success) throw new Error("Could not fetch company data");

        setEstablishmentData(data);
      } catch (err: any) {
        console.error(err);
        throw new Error("Could not fetch company data");
      }
    }

    getEstablishmentData();
  }, []);
  const { cartItems, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-semibold text-white"
        >
          Carrinho ({cartItems.total_items})
        </button>

        <span className="text-lg font-bold text-green-600">
          {formatBRL(cartItems.total_price)}
        </span>

        {cartItems.length > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: establishmentData?.data.secondary_color }}
            className=" text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Finalizar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="max-h-64 overflow-y-auto border-t border-zinc-200 bg-zinc-50 px-4 py-3">
          {cartItems.length === 0 ? (
            <p className="text-white text-sm">Seu carrinho está vazio</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-sm text-white">
                      {formatBRL(item.price)} x {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition"
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
