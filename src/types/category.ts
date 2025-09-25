import type { ProductData } from "./product";

export interface CategoryData {
  id: number;
  name: string;
  products: ProductData[];
}
