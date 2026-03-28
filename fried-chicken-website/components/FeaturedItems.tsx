import AnimatedSection from "./AnimatedSection";
import MenuCard from "./MenuCard";
import { featuredItems } from "@/data/menu";

export default function FeaturedItems() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            ⭐ Customer Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured Items
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Our most popular dishes that keep customers coming back for more
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredItems.map((item, index) => (
            <AnimatedSection key={item.id} animation="fade-up" delay={index * 100}>
              <MenuCard item={item} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
