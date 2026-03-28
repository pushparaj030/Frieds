"use client";

import { useState, useMemo } from "react";
import AnimatedSection from "./AnimatedSection";
import MenuCard from "./MenuCard";
import { menuItems, categories } from "@/data/menu";
import { useSearch } from "@/context/SearchContext";

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { searchQuery } = useSearch();

  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (activeCategory !== "All") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  const hasResults = filteredItems.length > 0;

  return (
    <section id="menu" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-dark-gray">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            📋 Full Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Menu
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Explore our complete menu featuring the best fried chicken and more
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" className="mb-10 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                activeCategory === "All"
                  ? "bg-primary text-white shadow-lg shadow-red-500/25 scale-105"
                  : "bg-dark text-gray-400 hover:text-white hover:bg-primary/20 border border-gray-700 hover:border-primary/50"
              }`}
            >
              All
            </button>
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg shadow-red-500/25 scale-105"
                    : "bg-dark text-gray-400 hover:text-white hover:bg-primary/20 border border-gray-700 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {searchQuery.trim() && (
          <AnimatedSection animation="fade-up" className="mb-6 text-center">
            <p className="text-gray-400">
              {hasResults ? (
                <>
                  Found <span className="text-primary font-semibold">{filteredItems.length}</span> results for &ldquo;
                  <span className="text-white font-semibold">{searchQuery}</span>&rdquo;
                </>
              ) : (
                <>
                  No results found for &ldquo;
                  <span className="text-white font-semibold">{searchQuery}</span>&rdquo;
                </>
              )}
            </p>
          </AnimatedSection>
        )}

        {hasResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} animation="fade-up" delay={index * 75}>
                <MenuCard item={item} index={index} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection animation="fade-up" className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
            <p className="text-gray-400 mb-4">Try a different search term or browse categories</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="btn-primary text-sm"
            >
              View All Items
            </button>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
