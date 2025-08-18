import { useState, useMemo } from 'react'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductsContext'

export default function Home() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const { products, loading, error, categories } = useProducts()

  const filteredProducts = useMemo(() => {
    if (!products) return []
    return products
      .filter(p => category === 'All' || p.category === category)
      .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  }, [category, search, products])

  if (loading) return <div className="text-center py-8">Loading products...</div>
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <FilterBar
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />
      <ProductGrid products={filteredProducts} />
    </>
  )
}