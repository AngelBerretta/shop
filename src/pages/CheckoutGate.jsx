import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CheckoutGate() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
    } else {
      navigate('/my-orders', { replace: true }) // store order and show
    }
  }, [user, navigate])

  return null
}