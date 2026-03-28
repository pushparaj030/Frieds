import AnimatedSection from "./AnimatedSection";

const features = [
  {
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop",
    title: "Fresh Ingredients",
    description: "We use only farm-fresh chicken and vegetables daily",
    overlayColor: "bg-green-500/60",
  },
  {
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=300&fit=crop",
    title: "Fast Delivery",
    description: "Hot and crispy food delivered within 30 minutes",
    overlayColor: "bg-blue-500/60",
  },
  {
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
    title: "Best Taste",
    description: "Our secret recipe guarantees the best flavor",
    overlayColor: "bg-orange-500/60",
  },
  {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    title: "Hygienic Cooking",
    description: "Following the highest standards of cleanliness",
    overlayColor: "bg-purple-500/60",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            💯 Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why People Love Us
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            We are committed to delivering the best fried chicken experience
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <div className={`${feature.overlayColor} rounded-xl p-3 backdrop-blur-sm bg-opacity-90`}>
                    <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg mb-1 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-100 text-xs sm:text-sm drop-shadow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
