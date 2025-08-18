import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function FilterBar({ category, setCategory, search, setSearch, categories }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}