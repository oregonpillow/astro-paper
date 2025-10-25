export const SITE = {
  website: "https://oregonpillow.com", // replace this with your deployed domain
  author: "Timothy Pillow",
  profile: "https://satnaing.dev/",
  desc: "DevOps related articles, notes to myself and other random things the internet fails to explain well.",
  title: "oregonpillow",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 20,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Zurich", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
