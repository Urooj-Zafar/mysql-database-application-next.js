"use client";

export default function ProductCard({ product }) {

  return (
    <div
      className="bg-white rounded-2xl p-6 h-full flex flex-col
                 shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                 transition duration-300"
    >

      {/* TOP */}
      <div className="flex items-start justify-between gap-3 mb-6">

        <div className="flex-1 min-w-0">

          <h2
            className="text-2xl font-bold truncate"
            title={product.name}
          >
            {product.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Product ID: #{product.product_id}
          </p>

        </div>

        <span
          className="bg-black text-white text-xs px-3 py-1 rounded-full
                     whitespace-nowrap"
        >
          {product.category_name}
        </span>

      </div>

      {/* DETAILS */}
      <div className="space-y-4 flex-1">

        <div
          className="bg-gray-50 rounded-xl p-4 h-[95px]
                     flex flex-col justify-center
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]"
        >

          <p className="text-sm text-gray-500 mb-1">
            Price
          </p>

          <h3 className="text-2xl font-bold truncate">
            ${product.price}
          </h3>

        </div>

        <div
          className="bg-gray-50 rounded-xl p-4 h-[95px]
                     flex flex-col justify-center
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]"
        >

          <p className="text-sm text-gray-500 mb-1">
            Stock
          </p>

          <h3
            className={`text-xl font-bold truncate ${
              product.stock > 0
                ? "text-black"
                : "text-red-500"
            }`}
          >
            {product.stock} Units
          </h3>

        </div>




        </div>

      </div>

  );
}