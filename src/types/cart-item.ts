import type { ProductData } from "./product";

export interface CartItem extends ProductData {
  quantity: number;
}