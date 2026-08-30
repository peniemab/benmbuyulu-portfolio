export const SECTIONS = [
  { id: "accueil" as const, href: "/atelier/accueil", preview: "/" },
  { id: "oeuvres" as const, href: "/atelier/oeuvres", preview: "/#oeuvres" },
  { id: "bio" as const, href: "/atelier/bio", preview: "/#bio" },
  { id: "inSitu" as const, href: "/atelier/in-situ", preview: "/#in-situ" },
  {
    id: "publications" as const,
    href: "/atelier/publications",
    preview: "/#publications",
  },
  { id: "contact" as const, href: "/atelier/contact", preview: "/#contact" },
];

export type SectionId = (typeof SECTIONS)[number]["id"];
