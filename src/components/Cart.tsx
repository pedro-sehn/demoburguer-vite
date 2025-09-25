import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/format-brl";

export default function Cart() {
  const { cartItems, removeItem } = useCart();

  return (
    <div>
      Carrinho({cartItems.total_items}) - {formatBRL(cartItems.total_price)}
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button
                onClick={() => removeItem(item.id)}
                className="bg-zinc-200 text-black text-lg w-6 h-6 rounded-full cursor-pointer"
              >
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
