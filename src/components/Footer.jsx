export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-2">ShopFast</h3>
            <p>High-quality products, fast delivery.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Quick links</h3>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/track" className="hover:text-white">
                  Track Order
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Contact</h3>
            <p>support@shopfast.com</p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs">
          © {new Date().getFullYear()} ShopFast. All rights reserved.
        </div>
      </div>
    </footer>
  )
}