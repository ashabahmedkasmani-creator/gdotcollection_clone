import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import BestSellers from "@/components/BestSellers";
import ScrollShowcase from "@/components/ScrollShowcase";
import Marquee from "@/components/Marquee";
import Editorial from "@/components/Editorial";
import Discover from "@/components/Discover";
import ShopInfo from "@/components/ShopInfo";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";

// Hero → collections → best sellers → marquee → pinned scroll scene → magazine edit → index browser → info → FAQ → newsletter → footer.
export default function Home() {
  return (<>
    <Hero />
    <Collections />
    <BestSellers />
    <div className="relative z-[1] bg-white pb-6 text-ink" aria-hidden><Marquee words={["Embroidery", "Lace", "Lawn", "Chikankari", "Schiffli", "Cutwork"]} /></div>
    <ScrollShowcase />
    <Editorial />
    <Discover />
    <ShopInfo />
    <Faq />
    <Newsletter />
  </>);
}
