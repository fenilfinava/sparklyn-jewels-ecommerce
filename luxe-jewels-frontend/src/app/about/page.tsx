import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-3xl font-heading tracking-[0.2em] uppercase text-gray-900 mb-8">About Us</h1>
          <p className="text-gray-500 leading-relaxed text-sm tracking-wide">
            Sparklyn was founded on a simple principle: to craft exquisite jewelry using ethically sourced, lab-grown diamonds without compromising on quality or brilliance. Our master jewelers handcraft each piece in-house, ensuring that every ring, necklace, and bracelet is a timeless work of art designed to last generations.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
