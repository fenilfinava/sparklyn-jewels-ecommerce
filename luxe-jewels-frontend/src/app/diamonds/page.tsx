import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DiamondsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-3xl font-heading tracking-[0.2em] uppercase text-gray-900 mb-8">Our Diamonds</h1>
          <p className="text-gray-500 leading-relaxed text-sm tracking-wide">
            Every Sparklyn diamond is lab-grown, meaning it is chemically, physically, and optically identical to a mined diamond, but with a guaranteed conflict-free origin. We only select diamonds graded by the International Gemological Institute (IGI) to ensure maximum brilliance, fire, and scintillation.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
