"use client";

import AnimatedSection from "./AnimatedSection";
import { useCart } from "@/context/CartContext";
import { domain } from "@/data/config";

const steps = [
  {
    title: "Open Website",
    description: `Visit ${domain} on your phone or computer`,
    icon: "🌐",
  },
  {
    title: "Browse Menu",
    description: "Explore our delicious menu and pick your favorites",
    icon: "📋",
  },
  {
    title: "Add to Cart",
    description: "Tap the Add button on any item you want",
    icon: "👆",
  },
  {
    title: "Fill Details",
    description: "Enter your name, phone and address",
    icon: "📝",
  },
  {
    title: "Order Sent",
    description: "Send via WhatsApp and we'll prepare your order!",
    icon: "✅",
  },
];

export default function HowItWorks() {
  const { openDirectCheckout } = useCart();

  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-dark-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            📱 Easy Ordering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Ordering is as easy as 1-2-3-4-5! No app downloads needed
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 opacity-30" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="relative bg-dark rounded-2xl p-5 sm:p-6 md:p-8 text-center card-hover border border-gray-800 hover:border-primary/50 group h-full">
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mt-6 sm:mt-8 mb-4 sm:mb-5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-primary/20">
                    <span className="text-4xl sm:text-5xl">{step.icon}</span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection animation="fade-up" className="mt-10 sm:mt-12 md:mt-16 text-center">
          <button
            onClick={openDirectCheckout}
            className="inline-flex items-center gap-2 sm:gap-3 btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order Now
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
