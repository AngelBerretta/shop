// src/pages/Account.jsx
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const navigate = useNavigate()

  const handleSave = () => {
    updateUser({ name, email })
    setIsEditing(false)
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="text-gray-900">{name || 'Not provided'}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="text-gray-900">{email}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="mr-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}