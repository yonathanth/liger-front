/**
 * Share (Open Graph) settings for a page. Next replaces the whole openGraph object
 * when a page sets its own, so every page builds it here and none loses the image.
 */
import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/site";

export const SHARE_IMAGE = {
  url: `${SITE_BASE_URL}/og-image.png`,
  secureUrl: `${SITE_BASE_URL}/og-image.png`,
  type: "image/png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}, community gym in Haile Garment, Addis Ababa`,
};

export function shareMeta({
  title,
  description,
  path = "",
  imageUrl,
  imageAlt,
}: {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
  imageAlt?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = imageUrl
    ? {
        url: imageUrl.startsWith("http") ? imageUrl : `${SITE_BASE_URL}${imageUrl}`,
        secureUrl: imageUrl.startsWith("http") ? imageUrl : `${SITE_BASE_URL}${imageUrl}`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: imageAlt || title,
      }
    : SHARE_IMAGE;

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: `${SITE_BASE_URL}${path}`,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
