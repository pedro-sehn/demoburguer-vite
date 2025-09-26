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
    <div className="flex flex-col md:flex-row justify-around p-4">
      <div className="min-w-24 md:min-w-24 w-full md:w-1/2">
        {url_image ? (
          <div className="flex justify-center items-center">
            <img
              src={url_image}
              alt={`Foto de ${name}`}
              className="w-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <img
            src="https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
            alt="Foto de comida"
            className="w-full object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col justify-between mt-4 md:ml-6 md:mt-0">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--primary-text-color)] leading-snug sm:w-32 lg:w-60">
            {name}
          </h2>
          {details && (
            <p className="text-zinc-400 text-sm mt-1 line-clamp-3 w-60">
              {details}
            </p>
          )}

          <div className="mt-3">
            {promotional_price ? (
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">
                  {formatBRL(promotional_price)}
                </span>
                <span className="text-zinc-400 line-through text-sm">
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
        <div className="flex justify-center mt-4 md:mt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => removeItem(id)}
                className="w-9 h-9 bg-[var(--secondary-color)] sm:w-10 sm:h-10 text-lg rounded-full flex items-center justify-center cursor-pointer"
              >
                –
              </button>

              <span className="text-lg font-medium min-w-[24px] text-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  addItem({ id, name, price, quantity: 1 } as CartItem)
                }
                className="w-9 h-9 bg-[var(--secondary-color)] sm:w-10 sm:h-10 text-lg rounded-full flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
