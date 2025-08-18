import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.payload.id)
      const newItem = {
        ...action.payload,
        qty: 1,
        addedAt: new Date().toLocaleString()
      }
      if (exists) {
        return state.map(i =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, newItem]
    }

    case 'REMOVE':
      return state.filter(i => i.id !== action.payload)

    case 'INCREASE':
      return state.map(i =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      )

    case 'DECREASE':
      return state
        .map(i =>
          i.id === action.payload ? { ...i, qty: Math.max(0, i.qty - 1) } : i
        )
        .filter(i => i.qty > 0)

    case 'CLEAR':
      return []

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, [])
  const [toast, setToast] = useState(null)

  const addToCart = product => {
    dispatch({ type: 'ADD', payload: product })
    setToast(
      `${product.title} added – $${product.price.toFixed(2)} at ${new Date().toLocaleString()}`
    )
    setTimeout(() => setToast(null), 3000)
  }

  const removeFromCart = id => dispatch({ type: 'REMOVE', payload: id })
  const increaseQty = id => dispatch({ type: 'INCREASE', payload: id })
  const decreaseQty = id => dispatch({ type: 'DECREASE', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)