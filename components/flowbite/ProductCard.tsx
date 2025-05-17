import { toCurrency } from "utils";
import Link from "next/link";

const ProductCard = ({ product, isDocumentExist, documents }: any) => (
  <div className="w-full p-2">
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md overflow-hidden shadow-sm">
      <Link href={`/products/${product.attributes.slug}`}>
        <button className="mx-auto w-full">
          {isDocumentExist ? (
            <img
              className="w-full h-48 object-cover"
              src={documents[0]?.attributes.filename}
              alt="product image"
              onError={(e: any) => (e.target.src = "/assets/image-1@2x.jpg")}
            />
          ) : (
            <img
              className="w-full h-48 object-cover"
              src="/assets/image-1@2x.jpg"
              alt="product image"
            />
          )}
        </button>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.attributes.slug}`}>
          <h3 className="text-md font-semibold hover:underline">
            {product.attributes.name} ({product.attributes.code})
          </h3>
        </Link>
        <div className="text-green-600 font-bold text-lg mb-2">
          {toCurrency(product.attributes.price)}
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-2">★ 5.0</span>
          <span className="text-green-500 mr-2">1rb+ terjual</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
