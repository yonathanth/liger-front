import { SchemaComponent } from "@/lib/schema-component";
import { breadcrumbSchema, faqSchema, offerCatalogSchema } from "@/lib/schemas";
import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import { ServicesContent } from "./services-content";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";
import { getCatalog } from "@/lib/catalog";
import { servicesFaq } from "@/lib/faq-content";
import { BUSINESS_AREA, SITE_BASE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Membership & Prices | ${SITE_NAME} | ${BUSINESS_AREA}`,
  description: `Membership plans and class timetable at ${SITE_NAME}, ${BUSINESS_AREA}. Up-to-date prices, register online.`,
  ...shareMeta({
    title: `Membership | ${SITE_NAME}`,
    description: `Plans and prices at ${SITE_NAME}.`,
    path: "/services",
  }),
  alternates: { canonical: `${SITE_BASE_URL}/services` },
};

// Prices come from the desktop app; refresh at most once a minute.
export const revalidate = 60;

export default async function ServicesPage() {
  const catalog = await getCatalog();

  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      <ServicesContent catalog={catalog} />

      <SiteFooter />

      <SchemaComponent
        schema={breadcrumbSchema([
          { name: "Home", url: SITE_BASE_URL },
          { name: "Services", url: `${SITE_BASE_URL}/services` },
        ])}
      />
      {catalog.plans.length > 0 && <SchemaComponent schema={offerCatalogSchema(catalog.plans)} />}
      <SchemaComponent
        schema={faqSchema(servicesFaq.map((f) => ({ question: f.question, answer: f.answer })))}
      />
    </div>
  );
}
