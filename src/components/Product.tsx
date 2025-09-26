import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/cart-item";
import type { ProductData } from "../types/product";
import { formatBRL } from "../utils/format-brl";

export default function Product({
  id,
  name,
  details,
  url_image,
  price,
  promotional_price,
}: ProductData) {
  const { cartItems, addItem, removeItem } = useCart();
  const quantity = cartItems.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {url_image && (
        <div className="flex justify-center items-center">
          <img
            src={url_image}
            alt={`Foto de ${name}`}
            className="w-full sm:w-40 h-40 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white-900 leading-snug">
            {name}
          </h2>
          {details && (
            <p className="text-white-600 text-sm mt-1 line-clamp-3">
              {details}
            </p>
          )}
        </div>

        <div className="mt-3">
          {promotional_price ? (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">
                {formatBRL(promotional_price)}
              </span>
              <span className="text-zinc-500 line-through text-sm">
                {formatBRL(price)}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                Promoção
              </span>
            </div>
          ) : (
            <span className="text-green-600 font-bold text-lg">
              {formatBRL(price)}
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => removeItem(id)}
            className="w-8 h-8 bg-[var(--secondary-color)] sm:w-9 sm:h-9 text-lg rounded-full flex items-center justify-center transition-colors"
          >
            –
          </button>

          <span className="text-lg font-medium min-w-[24px] text-center">
            {quantity}
          </span>

          <button
            onClick={() => addItem({ id, price, quantity: 1 } as CartItem)}
            className="w-8 h-8 bg-[var(--secondary-color)] sm:w-9 sm:h-9 text-lg rounded-full flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
