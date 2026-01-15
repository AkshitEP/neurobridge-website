import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NeuroBridgeScroll from "@/components/NeuroBridgeScroll";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <Hero />
      <div id="product">
        <NeuroBridgeScroll />
      </div>
      <Features />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
