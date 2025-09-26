import { useEffect, useState } from "react";
import type { CategoryData } from "../types/category";
import Product from "./Product";

interface ResponseData {
  success: boolean;
  detail: string;
  products: CategoryData["products"];
}

export default function Menu() {
  const [categories, setCategories] = useState<CategoryData[]>([]);

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
        console.error(err);
        throw new Error(err.message);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-[var(--background-color)] text-[var(--primary-text-color)] px-4 py-6 flex flex-col items-center justify-center border-t-3 border-[var(--primary-color)]">
      <h2 className="text-3xl font-bold my-4 text-center">Cardápio</h2>

      {categories.length > 0 ? (
        categories.map((category) => (
          <section key={category.id} id={category.name} className="w-full mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-[var(--primary-color)] pb-2">
              {category.name}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {category.products.map((product) => {
                return (
                  <div
                    key={`${category.id}-${product.id}`}
                    className="bg-[var(--background-color)] p-4 rounded-2xl shadow-md hover:shadow-lg transition-all border border-transparent hover:border-[var(--primary-color)] flex flex-col justify-between"
                  >
                    <Product {...product} />
                  </div>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <p className="text-center">Carregando produtos...</p>
      )}
    </div>
  );
}
