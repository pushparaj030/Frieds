"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [isJustAdded, setIsJustAdded] = useState(false);
  
  const cartItem = items.find((i) => i.id === item.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(item);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 2000);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <div 
      className="group bg-dark-gray rounded-2xl overflow-hidden card-hover border border-gray-800/50 hover:border-primary/50 relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span className="bg-gradient-to-r from-accent to-yellow-500 text-dark font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            ₹{item.price}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-2">
          <span className="bg-black/60 backdrop-blur-sm text-white/90 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-white/10">
            {item.category}
          </span>
          {isInCart && (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Cart
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {isInCart ? (
          <div className="flex items-center justify-center gap-3 py-2.5 sm:py-3 bg-green-600/20 border border-green-500/50 rounded-full">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary hover:bg-primary/80 text-white font-bold flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="text-white font-bold text-base sm:text-lg min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary hover:bg-primary/80 text-white font-bold flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 sm:py-3 flex items-center justify-center gap-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              isJustAdded
                ? "bg-green-500 text-white"
                : "btn-primary"
            }`}
          >
            {isJustAdded ? (
              <>
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
