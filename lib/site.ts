/**
 * Everything about the gym the public pages show, in one place. Change the name,
 * domain, contact details or hours here and every page, the footer, SEO tags and
 * structured data follow.
 */

export const SITE_NAME = "Liger Gym";
/** Short form for tight spots (nav on small screens, PWA name). */
export const SITE_SHORT_NAME = "Liger";
// TODO: domain not decided yet.
export const SITE_BASE_URL = "https://ligergym.com";

export const SITE_TAGLINE = "Train like a hybrid. Built for strength, made for everyone.";
export const SITE_DESCRIPTION =
  "Liger Gym in Meskelegna, Addis Ababa: strength training, cardio and classes, open every day.";

export const BUSINESS_LOCATION_LINE =
  "Haile Garment, Meskelegna, beside Ethio Telecom";
export const BUSINESS_AREA = "Haile Garment, Addis Ababa";
export const BUSINESS_CITY = "Addis Ababa";

export const GEO = { latitude: 8.93563, longitude: 38.72272 } as const;
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJs_KeZACBSxYRhnH_5XwF_9Q";
export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=8.93563,38.72272&destination_place_id=ChIJs_KeZACBSxYRhnH_5XwF_9Q";
/** Google Maps embed of the Liger Gym listing itself (pin and name), not just coordinates. */
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d508.0879667690983!2d38.722662032362386!3d8.935756398211531!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8100649ef2b3%3A0xd4ff057ce5ff7186!2sLiger%20Gym!5e0!3m2!1sen!2sus!4v1792068069604!5m2!1sen!2sus";

export const PHONE_DISPLAY = "091 070 4845";
export const PHONE_E164 = "+251910704845";

/** Only networks with a real link are shown anywhere on the site. */
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string; icon: string }> = [
  { label: "TikTok", href: "https://www.tiktok.com/@liger.gym", icon: "music_note" },
];

// TODO: hours are from Google Maps; confirm with the gym.
/** Rows as shown on the site, in order. */
export const OPENING_HOURS: ReadonlyArray<{ days: string; hours: string }> = [
  { days: "Every day", hours: "6:00 AM – 9:00 PM" },
];
export const OPENING_HOURS_SUMMARY = "Open every day, 6 AM – 9 PM";
export const CLOSING_TIME_SHORT = "9 PM";

export const OPENING_HOURS_SCHEMA = [
  {
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "21:00",
  },
] as const;

export const ADDRESS_SCHEMA = {
  streetAddress: BUSINESS_LOCATION_LINE,
  addressLocality: BUSINESS_CITY,
  addressCountry: "ET",
} as const;

export const CURRENCY = "ETB";
