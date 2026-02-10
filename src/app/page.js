"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero */}
      <section className="relative py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-slate-800/40 backdrop-blur-sm rounded-full border border-cyan-500/20 mb-8">
            <span className="text-cyan-300 font-medium">Welcome to Souvenir</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Gifts
            </span>
          </h1>
          
          <p className="text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Discover three unique ways to find the perfect present
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Curated Collections</span>
            </div>
            <div className="text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Personalized Options</span>
            </div>
            <div className="text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Options */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Products Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <Link href="/products">
              <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-4xl">🛍️</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Products</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Browse our extensive collection of individual items. Perfect when you know exactly what you're looking for.
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                    Shop Products →
                  </span>
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Gifts Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <Link href="/gifts">
              <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-4xl">🎁</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Gift Sets</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Beautifully curated collections handpicked by our experts. No guesswork needed — just choose and delight.
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                    View Collections →
                  </span>
                  <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Custom Gifts Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <Link href="/custom-gifts">
              <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl p-8 border border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-4xl">✨</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Custom Gifts</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Personalized creations tailored to your vision. Turn ideas into unforgettable gifts with our customization.
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 text-sm font-medium group-hover:text-pink-300 transition-colors">
                    Create Custom →
                  </span>
                  <div className="w-8 h-8 bg-pink-500/10 rounded-full flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-16 border-t border-slate-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-slate-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-slate-400 text-sm">Gifts Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5K+</div>
              <div className="text-slate-400 text-sm">Custom Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 text-sm">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}