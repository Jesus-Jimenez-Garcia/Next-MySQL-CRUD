import Link from "next/link";

export function ProductCard({product}) {
  return (
    <Link href={`/products/${product.id}`}>
      <a>
        <div className="border border-gray-200 hover:border-gray-700 transition-all duration-300 hover:skew-y-1 shadow-md p-6 my-2">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      </a>
    </Link>
  );
}
