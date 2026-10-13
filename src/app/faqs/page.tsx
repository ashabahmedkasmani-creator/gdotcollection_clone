import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = { title: "FAQs", alternates: { canonical: "/faqs" } };

export default function Faqs() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="container-x page-enter pb-8 pt-36 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h1 className="h-display text-[clamp(2.6rem,7vw,6rem)]">FAQs</h1>
      <div className="mt-12 max-w-3xl"><Faq items={FAQS} /></div>
    </div>
  );
}
