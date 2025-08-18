import { createContext, useContext, useState, useEffect } from 'react'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('https://fakestoreapi.com/products')
        const productsData = await productsResponse.json()
        
        // Fetch categories
        const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories')
        const categoriesData = await categoriesResponse.json()

        // Format products to match our structure
        const formattedProducts = productsData.map(product => ({
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          image: product.image,
          description: product.description || 'No description available'
        }))

        setProducts(formattedProducts)
        setCategories(['All', ...categoriesData])
      } catch (err) {
        setError(err.message)
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, error, categories }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)