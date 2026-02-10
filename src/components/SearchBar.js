"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

// Search suggestions by page type
const searchSuggestions = {
  all: [
    { name: "Gift Box", type: "product" },
    { name: "Birthday Set", type: "gift" },
    { name: "Personalized Mug", type: "custom" },
    { name: "Scented Candle", type: "product" },
    { name: "Anniversary Gift", type: "gift" },
    { name: "Custom Frame", type: "custom" },
    { name: "Chocolate Basket", type: "product" },
    { name: "Gift Card", type: "gift" },
  ]
};

export default function SearchBar({ isMobile = false, onCloseMobile }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matched = searchSuggestions.all
      .filter(item => item.name.toLowerCase().includes(query))
      .slice(0, 5);

    setSuggestions(matched);
    setShowSuggestions(matched.length > 0);
  }, [searchQuery]);

  // Handle search - goes to appropriate page based on context
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Determine which page to search based on current page
    let targetPage = "/products"; // Default
    
    if (pathname === "/gifts" || pathname.includes("/gifts")) {
      targetPage = "/gifts";
    } else if (pathname === "/custom-gifts" || pathname.includes("/custom-gifts")) {
      targetPage = "/custom-gifts";
    } else if (pathname === "/" || pathname === "/home") {
      // On homepage, let user choose or default to products
      targetPage = "/products";
    }

    // Navigate to page with search query
    router.push(`${targetPage}?search=${encodeURIComponent(searchQuery)}`);
    
    // Reset
    setSearchQuery("");
    setShowSuggestions(false);
    
    // Close mobile menu if needed
    if (isMobile && onCloseMobile) onCloseMobile();
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion) => {
    // Determine page based on suggestion type
    let targetPage = "/products";
    if (suggestion.type === "gift") targetPage = "/gifts";
    if (suggestion.type === "custom") targetPage = "/custom-gifts";
    
    router.push(`${targetPage}?search=${encodeURIComponent(suggestion.name)}`);
    setSearchQuery("");
    setShowSuggestions(false);
    if (isMobile && onCloseMobile) onCloseMobile();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Get placeholder based on current page
  const getPlaceholder = () => {
    if (pathname === "/gifts" || pathname.includes("/gifts")) {
      return "Search gift sets...";
    } else if (pathname === "/custom-gifts" || pathname.includes("/custom-gifts")) {
      return "Search custom gifts...";
    } else if (pathname === "/products" || pathname.includes("/products")) {
      return "Search products...";
    } else {
      return "Search gifts...";
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className={isMobile ? "w-full mb-4" : "w-full max-w-xs"}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
            placeholder={getPlaceholder()}
            className={`w-full pl-10 pr-4 py-2.5 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 ${
              isMobile ? "rounded-xl" : "rounded-full focus:ring-1 focus:ring-cyan-500/30"
            }`}
          />
          
          <svg 
            className="absolute left-3 top-3 w-4 h-4 text-cyan-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-50 w-full mt-1 bg-slate-800/95 backdrop-blur-lg rounded-xl border border-cyan-500/30 shadow-2xl ${
          isMobile ? "max-h-60 overflow-y-auto" : ""
        }`}>
          <div className="p-2">
            <div className="text-xs text-cyan-300 font-semibold px-3 py-2">
              SUGGESTIONS
            </div>
            
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="w-full text-left px-4 py-3 hover:bg-slate-700/50 rounded-lg transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {item.type === "product" && "🛍️"}
                    {item.type === "gift" && "🎁"}
                    {item.type === "custom" && "✨"}
                  </div>
                  <div>
                    <div className="text-white font-medium group-hover:text-cyan-300">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {item.type === "product" && "Product"}
                      {item.type === "gift" && "Gift Set"}
                      {item.type === "custom" && "Custom Gift"}
                    </div>
                  </div>
                </div>
                <div className="text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </button>
            ))}
            
            <div className="border-t border-cyan-500/20 mt-2 pt-2">
              <button
                onClick={handleSearch}
                className="w-full text-center px-4 py-2 text-cyan-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors text-sm font-medium"
              >
                Search for "{searchQuery}"
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}