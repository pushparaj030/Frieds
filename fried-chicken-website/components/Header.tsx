"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import CartSidebar from "./CartSidebar";
import OrderForm from "./OrderForm";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, totalPrice, isCartOpen, openCart, closeCart, openCheckout, openDirectCheckout } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-gray-800"
            : "bg-dark md:bg-gradient-to-b md:from-dark md:via-dark/95 md:to-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-2xl sm:text-3xl group-hover:animate-bounce">🍗</span>
              <span className="text-lg sm:text-xl font-bold text-white">
                Fried<span className="text-primary">Chicken</span>s
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-6">
              <div className={`relative flex items-center transition-all duration-300 ${isSearchExpanded ? "w-64" : "w-auto"}`}>
                {isSearchExpanded && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search menu..."
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        handleSearchToggle();
                      }
                    }}
                  />
                )}
                <button
                  onClick={handleSearchToggle}
                  className={`p-2 text-gray-300 hover:text-white transition-colors ${isSearchExpanded ? "absolute right-2" : ""}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              <button
                onClick={openCart}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {totalItems > 0 ? (
                <button
                  onClick={openCart}
                  className="btn-secondary text-sm py-2 px-5 flex items-center gap-2"
                >
                  <span>Order Now</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    ₹{totalPrice}
                  </span>
                </button>
              ) : (
                <button
                  onClick={openDirectCheckout}
                  className="btn-primary text-sm py-2 px-5"
                >
                  Order Now
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={handleSearchToggle}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={openCart}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {isSearchExpanded && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu items..."
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button
                  onClick={handleSearchToggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-gray-300 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5 w-full text-right"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  openDirectCheckout();
                }}
                className="btn-primary text-sm py-3 text-center mt-2 w-full"
              >
                Order Now
              </button>
            </div>
          </div>
        </nav>
      </header>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-dark/95 backdrop-blur-lg border-t border-gray-800 p-4 pb-6 safe-area-bottom">
          <button
            onClick={openCart}
            className="w-full btn-secondary py-4 flex items-center justify-center gap-3 text-lg font-bold shadow-lg"
          >
            <span className="text-xl">🛒</span>
            <span>Order Now</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-base">
              ₹{totalPrice}
            </span>
            <span className="bg-primary px-3 py-1 rounded-full text-base">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </button>
        </div>
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={openCheckout}
      />

      <OrderForm />
    </>
  );
}
