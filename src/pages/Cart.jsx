import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

export default function Cart() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) return navigate('/login', { replace: true })

    const order = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      items,
      totalPrice,
    }

    const key = `orders_${user.id}`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([...existing, order]))
    clearCart()
    navigate(`/order/${order.id}`, { replace: true })
  }

  if (!items.length)
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/" className="text-indigo-600 underline mt-2">
          Continue shopping
        </Link>
      </div>
    )

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="text-right mt-6">
        <p className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  )
}