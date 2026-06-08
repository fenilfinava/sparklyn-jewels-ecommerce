import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-3xl font-heading tracking-[0.2em] uppercase text-gray-900 mb-8">Contact Us</h1>
          <p className="text-gray-500 leading-relaxed text-sm tracking-wide mb-12">
            Have a question about a product or need help with your order? Our diamond concierges are here to assist you.
          </p>
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-2">Email</h2>
              <a href="mailto:support@sparklyn.com" className="text-gray-500 hover:text-gray-900 transition underline">support@sparklyn.com</a>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-2">Phone</h2>
              <a href="tel:+18001234567" className="text-gray-500 hover:text-gray-900 transition underline">1-800-123-4567</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
