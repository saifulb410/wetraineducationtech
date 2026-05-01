import DisclaimerBanner from "@/app/components/DisclaimerBanner";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LiveChat from "@/app/components/LiveChat";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-[#080B14] text-white scroll-smooth">
      {/* Optional top banner or announcement */}
      <DisclaimerBanner />

      {/* Global marketing header */}
      <Header />

      {/* Main content */}
      <main id="main-content">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Fixed WhatsApp Button */}
      <WhatsAppButton />

      {/* Live chat widget (Tawk.to) */}
      <LiveChat />
    </div>
  );
}
