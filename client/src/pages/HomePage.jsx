import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WhytoChoose from "../components/WhytoChoose";
import TransformBusiness from "../components/TransformBussiness";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Shuvidha Counter – Smart Counter Management</title>
        <meta
          name="description"
          content="Manage billing, GST invoices, inventory, and ledgers in one place with Shuvidha Counter."
        />
        <meta
          name="keywords"
          content="counter software, billing software, GST invoicing, inventory management, Shuvidha Counter, accounting software, small business tools, Indian business management, invoicing software, store management"
        />
        <meta property="og:title" content="Shuvidha Counter" />
        <meta
          property="og:description"
          content="Billing, Inventory, GST invoices, ledgers, all in one place."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shuvidhacounter.store" />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-white text-[#1E1E2D] font-sans">
        <HeroSection />

        <FeaturesSection />

        <WhytoChoose />

        <TransformBusiness />

        {/* Footer */}
        <footer className="bg-[#1E1E2D] py-6 text-center text-white ">
          © {new Date().getFullYear()} Shuvidha Counter. All rights reserved.
        </footer>
      </div>
    </>
  );
}
