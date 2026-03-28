"use client";

import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedItems from "@/components/FeaturedItems";
import FullMenu from "@/components/FullMenu";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { totalItems } = useCart();

  return (
    <>
      <Header />
      <main className={`flex-1 pt-14 sm:pt-20 ${totalItems > 0 ? "pb-28" : ""}`}>
        <Hero />
        <FeaturedItems />
        <FullMenu />
        <WhyChooseUs />
        <HowItWorks />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
