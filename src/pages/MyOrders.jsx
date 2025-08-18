import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user) return
    const saved = JSON.parse(localStorage.getItem(`orders_${user.id}`) || '[]')
    setOrders(saved.reverse())
  }, [user])

  if (!orders.length)
    return <p className="text-center">No orders yet.</p>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <Link
            key={order.id}
            to={`/order/${order.id}`}
            className="block p-4 border rounded hover:shadow-lg"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Order ***REMOVED***{order.id.slice(0, 8)}</span>
              <span>{order.date}</span>
            </div>
            <div className="text-sm text-gray-600">
              {order.items.length} items • ${order.totalPrice.toFixed(2)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}