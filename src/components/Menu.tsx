import { useEffect, useState } from "react";
import type { CategoryData } from "../types/category";
import Product from "./Product";
import { useCart } from "../context/CartContext";

interface ResponseData {
  success: boolean;
  detail: string;
  products: CategoryData["products"];
}

export default function Products() {
  const { cartItems, addItem, removeItem } = useCart();

  const [categories, setCategories] = useState<CategoryData[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://demopizzaria.stbl.com.br/estoque/v2/app/products/list/?app_variant=mobile"
        );
        const data: ResponseData = await res.json();
        if (!data.success) throw new Error("Could not fetch company data");
        const { products } = data;
        const categoryMap = new Map();

        products.forEach((p) => {
          if (!categoryMap.has(p.category_id)) {
            categoryMap.set(p.category_id, {
              id: p.category_id,
              name: p.category_name,
              products: [] as typeof products,
            });
          }

          categoryMap.get(p.category_id)?.products.push(p);
        });

        const categories: CategoryData[] = Array.from(categoryMap.values());
        setCategories(categories);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <div className="px-6">
      <h2 className="text-2xl mb-4">Cardápio</h2>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} id={category.name} className="mb-8">
            <p className="text-xl">{category.name}</p>
            {category.products.map((product) => (
              <div key={`${category.id}-${product.id}`}>
                <Product key={product.id} {...product} />
                <div>
                  <button
                    onClick={() => addItem({ ...product, quantity: 1 })}
                    className="bg-zinc-200 text-black text-lg w-6 h-6 rounded-full cursor-pointer"
                  >
                    +
                  </button>
                  {cartItems.find((i) => i.id === product.id)?.quantity ?? 0}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="bg-zinc-200 text-black text-lg w-6 h-6 rounded-full cursor-pointer"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
