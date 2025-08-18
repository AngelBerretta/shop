import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function OrderDetail() {
  const { orderId } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`orders_${user.id}`) || '[]')
    const found = saved.find(o => o.id === orderId)
    setOrder(found)
  }, [orderId, user])

  if (!order) return <p>Order not found.</p>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Order Details</h1>
      <div className="bg-white p-6 rounded shadow mb-6">
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Products:</strong> {order.items.length}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <div className="space-y-4">
        {order.items.map(item => (
          <div key={item.id} className="flex items-center bg-white p-3 rounded shadow">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="ml-4">
              <p className="font-semibold">{item.title}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}