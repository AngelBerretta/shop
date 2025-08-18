import { useState } from 'react'
import { CheckCircleIcon, TruckIcon } from '@heroicons/react/24/solid'

/* Fake backend */
const mockOrders = {
  12345: {
    status: 'Shipped',
    steps: [
      { label: 'Order Confirmed', done: true },
      { label: 'Shipped', done: true },
      { label: 'Out for Delivery', done: false },
      { label: 'Delivered', done: false },
    ],
    items: ['Wireless Headphones', 'Cotton T-Shirt'],
  },
  67890: {
    status: 'Delivered',
    steps: [
      { label: 'Order Confirmed', done: true },
      { label: 'Shipped', done: true },
      { label: 'Out for Delivery', done: true },
      { label: 'Delivered', done: true },
    ],
    items: ['Running Shoes'],
  },
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = () => {
    const found = mockOrders[orderId.trim()]
    if (found) {
      setOrder(found)
      setError('')
    } else {
      setOrder(null)
      setError('Order not found.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter order ID (try 12345 or 67890)"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleTrack}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Track
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {order && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Order ***REMOVED***{orderId}</h2>

          <ul className="space-y-3">
            {order.steps.map((step, idx) => (
              <li key={idx} className="flex items-center">
                {step.done ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <TruckIcon className="w-6 h-6 text-gray-400 mr-2" />
                )}
                <span className={step.done ? 'text-green-600 font-semibold' : ''}>
                  {step.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-gray-700">
            Items: <span className="font-semibold">{order.items.join(', ')}</span>
          </p>
        </div>
      )}
    </div>
  )
}