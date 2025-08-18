import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col border border-gray-100 overflow-hidden">
      <Link 
        to={`/product/${product.id}`} 
        className="block relative pt-[100%] bg-gray-50"
      >
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg truncate mb-1">{product.title}</h3>
          <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
        </div>
        <div className="mt-auto">
          <p className="text-xl font-bold text-indigo-600 mb-3">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}