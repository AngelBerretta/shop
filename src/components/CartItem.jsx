import { TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart()

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1 ml-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => decreaseQty(item.id)}
          className="border px-3 rounded hover:bg-gray-100"
        >
          −
        </button>
        <span>{item.qty}</span>
        <button
          onClick={() => increaseQty(item.id)}
          className="border px-3 rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <p className="w-20 text-right font-bold">
        ${(item.qty * item.price).toFixed(2)}
      </p>

      <button
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
      </button>
    </div>
  )
}