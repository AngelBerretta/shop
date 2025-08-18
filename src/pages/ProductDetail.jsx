import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/outline'

export default function ProductDetail() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="image-container">
            <div className="image-content">
              <img
                src={product.image}
                alt={product.title}
                className="product-image max-w-full max-h-[400px] w-auto h-auto object-contain p-8"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-gray-500 ml-2">(24 reviews)</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Category:</span> {product.category}
              </p>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}