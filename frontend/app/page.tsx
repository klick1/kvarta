import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Proof from "@/components/Proof";
import Products from "@/components/Products";
import Subscription from "@/components/Subscription";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Delivery from "@/components/Delivery";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Proof />
        <Products />
        <Subscription />
        <HowItWorks />
        <About />
        <Delivery />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}