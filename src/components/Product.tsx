import type { ProductData } from "../types/product";
import { formatBRL } from "../utils/format-brl";

export default function Product({
  name,
  details,
  url_image,
  price,
  promotional_price,
}: ProductData) {
  return (
    <div>
      {url_image && (
        <img src={url_image} alt={`Foto de ${name}`} className="w-40" />
      )}
      <p className="text-lg">{name}</p>
      <p className="">{details}</p>
      <p className="text-green-600">
        {!promotional_price ? formatBRL(price) : formatBRL(promotional_price)}
      </p>
    </div>
  );
}
