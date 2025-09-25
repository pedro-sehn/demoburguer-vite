export interface ProductData {
  id: number;
  name: string;
  details: string;
  product_type: string;
  price: number;
  promotional_price: number | null;
  url_image: string;
  order: number;
  category_id: number;
  category_name: string;
}
