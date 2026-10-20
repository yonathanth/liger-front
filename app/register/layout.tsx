import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Join ${SITE_NAME} | Register online`,
  description: `Register at ${SITE_NAME}. Leave your details and pick a plan; we'll call you to finish signing up.`,
  ...shareMeta({
    title: `Join ${SITE_NAME}`,
    description: "Register online and we'll call you to finish signing up.",
    path: "/register",
  }),
  alternates: { canonical: `${SITE_BASE_URL}/register` },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
