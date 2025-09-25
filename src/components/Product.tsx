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
    <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
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
              <span className="text-white line-through text-sm">
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
    </div>
  );
}
