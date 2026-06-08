import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#faf9f8] pt-20 pb-10 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-1">
            <h2 className="text-3xl font-heading tracking-widest uppercase mb-6 text-gray-900">Sparklyn</h2>
          </div>
          
          <div className="col-span-1 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-2">Contact</h4>
            <Link href="/search" className="text-sm text-gray-500 hover:text-gray-900 transition">Search</Link>
            <Link href="/returns" className="text-sm text-gray-500 hover:text-gray-900 transition">Returns & Refunds</Link>
            <Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-900 transition">Shipping & Delivery</Link>
            <Link href="/account" className="text-sm text-gray-500 hover:text-gray-900 transition">My account</Link>
          </div>

          <div className="col-span-1 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-2">Shop</h4>
            <Link href="/collections/rings" className="text-sm text-gray-500 hover:text-gray-900 transition">Rings</Link>
            <Link href="/collections/earrings" className="text-sm text-gray-500 hover:text-gray-900 transition">Earrings</Link>
            <Link href="/collections/bracelets" className="text-sm text-gray-500 hover:text-gray-900 transition">Bracelets</Link>
            <Link href="/collections/necklaces" className="text-sm text-gray-500 hover:text-gray-900 transition">Necklaces</Link>
          </div>

          <div className="col-span-1 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-2">Company</h4>
            <Link href="/home" className="text-sm text-gray-500 hover:text-gray-900 transition">Home</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition">Contact</Link>
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition">About Us</Link>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-4">Join The Sparklyn Club</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe for store updates and discounts.</p>
            <div className="flex items-center border-b border-gray-300 py-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent outline-none flex-grow text-sm text-gray-700 placeholder-gray-400"
              />
              <button className="text-gray-900 ml-2">→</button>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
              By subscribing you agree to the <Link href="/terms" className="underline hover:text-gray-600">Terms of Use</Link> & <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-400 flex items-center space-x-2">
            <span>🇺🇸 United States (USD $)</span>
          </div>
          <div className="flex items-center space-x-3 opacity-60">
            {/* Visa */}
            <svg viewBox="0 0 38 24" width="38" height="24" className="border border-gray-200 rounded px-1"><path d="M14.628 20.37h4.032l2.361-14.887h-4.032l-2.361 14.887zm8.397-14.887h-3.136c-.571 0-1.042.336-1.258.85l-4.482 10.669-.64-3.266c-.366-1.571-1.638-2.607-3.078-2.774l-4.43-.377v1.884l2.671.503c.57.172.966.529 1.134 1.34l2.217 11.236h4.218l6.321-14.887c-.001-.001-.225 1.096 1.171-4.103a11.235 11.235 0 00-6.195-2.261C14.072 4.14 9.176 6.849 9.141 10.641c-.032 2.798 2.507 4.352 4.417 5.289 1.968.966 2.624 1.583 2.624 2.443-.021 1.319-1.582 1.928-3.045 1.928-2.029-.021-3.106-.545-4.004-.966l-.568-.266-.582 3.611c.995.46 2.825.859 4.74.881 3.52 0 5.823-1.737 5.864-4.428.021-1.468-1.03-2.585-2.636-3.342-1.748-.881-2.825-1.466-2.825-2.355 0-.796.862-1.624 2.94-1.624 1.637.011 2.825.347 3.652.736l.441.213.626-3.486c-.985-.45-2.316-.79-3.921-.79zm11.393 14.887H38v-14.887h-3.582z" fill="#142688"/></svg>
            {/* Mastercard */}
            <svg viewBox="0 0 38 24" width="38" height="24" className="border border-gray-200 rounded px-1"><path d="M22.587 19.123h-4.084V4.877h4.084v14.246zm11.328 0h-4.085v-7.123h4.085v7.123zm0-14.246h-4.085v7.123h4.085V4.877zm-22.656 0H7.175v14.246h4.084V4.877zm-7.175 0H0v7.123h4.084V4.877H0zM0 19.123h4.084v-7.123H0v7.123z" fill="#ff5f00"/><circle cx="15.828" cy="12" r="7.123" fill="#eb001b"/><circle cx="27.155" cy="12" r="7.123" fill="#f79e1b"/><path d="M21.491 12c0-2.355.882-4.506 2.338-6.155a7.125 7.125 0 00-4.675-10.967 7.125 7.125 0 000 14.244 7.125 7.125 0 004.675-10.967 7.148 7.148 0 01-2.338 6.155z" fill="#ff5f00"/></svg>
            {/* Apple Pay */}
            <svg viewBox="0 0 38 24" width="38" height="24" className="border border-gray-200 rounded px-1"><path d="M19 19.006c-1.39 0-2.812-.907-3.925-.907-1.144 0-2.428.847-3.66.847-1.575 0-3.033-.915-3.834-2.32-.14-.247-1.637-2.883-1.637-6.096 0-3.327 2.148-5.076 4.15-5.076 1.492 0 2.871 1.036 3.791 1.036.945 0 2.545-1.127 4.316-1.127 1.834 0 3.513.883 4.453 2.274-3.755 2.142-2.909 7.427.973 8.948-1.049 2.593-3.109 4.303-4.627 4.303m-2.186-12.75c0-.022.01-.043.011-.065.059-1.896 1.542-3.829 3.428-4.186.417 2.052-.907 4.093-3.439 4.251z" fill="#000"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
