import { useEffect, useState } from "react";
import type { CategoryData } from "../types/category";
import Product from "./Product";
import { useCart } from "../context/CartContext";
import type { EstablishmentData } from "../types/establishment";

interface ResponseData {
  success: boolean;
  detail: string;
  products: CategoryData["products"];
}

export default function Products() {
  const { cartItems, addItem, removeItem } = useCart();

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);

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

        setCategories(Array.from(categoryMap.values()));
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
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Cardápio
      </h2>

      {categories.length > 0 ? (
        categories.map((category) => (
          <section key={category.id} id={category.name} className="mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 border-b border-zinc-200 pb-2">
              {category.name}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => {
                const quantity =
                  cartItems.find((i) => i.id === product.id)?.quantity ?? 0;

                return (
                  <div
                    key={`${category.id}-${product.id}`}
                    className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <Product {...product} />

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeItem(product.id)}
                          style={{
                            backgroundColor:
                              establishmentData?.data.secondary_color,
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-200 hover:bg-zinc-300 text-black text-lg rounded-full flex items-center justify-center transition-colors"
                        >
                          –
                        </button>

                        <span className="text-lg font-medium text-white min-w-[24px] text-center">
                          {quantity}
                        </span>

                        <button
                          onClick={() => addItem({ ...product, quantity: 1 })}
                          style={{
                            backgroundColor:
                              establishmentData?.data.secondary_color,
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <p className="text-white text-center">Carregando produtos...</p>
      )}
    </div>
  );
}
