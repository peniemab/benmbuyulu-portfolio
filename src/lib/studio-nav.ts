export const SECTIONS = [
  {
    href: "/atelier/accueil",
    label: "Accueil",
    hint: "La grande photo en haut du site",
    action: "Changer la photo",
    preview: "/",
  },
  {
    href: "/atelier/oeuvres",
    label: "Œuvres",
    hint: "Les photos de la galerie",
    action: "Voir les œuvres",
    preview: "/#oeuvres",
  },
  {
    href: "/atelier/bio",
    label: "Bio",
    hint: "Votre portrait et votre texte",
    action: "Changer le portrait ou le texte",
    preview: "/#bio",
  },
  {
    href: "/atelier/in-situ",
    label: "In situ",
    hint: "Vos œuvres dans des lieux",
    action: "Ajouter une photo de lieu",
    preview: "/#in-situ",
  },
  {
    href: "/atelier/publications",
    label: "Publications",
    hint: "Articles, catalogues, presse",
    action: "Ajouter une publication",
    preview: "/#publications",
  },
  {
    href: "/atelier/contact",
    label: "Contact",
    hint: "Email et réseaux",
    action: "Changer l’e-mail ou les liens",
    preview: "/#contact",
  },
] as const;
