export const fr = {
  meta: {
    title: "Ben Mbuyulu : Portfolio",
    description:
      "Peintre et sculpteur. Projet Mystère du voile. Kinshasa.",
  },
  brand: "Ben Mbuyulu",
  common: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  locale: {
    fr: "FR",
    en: "EN",
    label: "Langue",
  },
  nav: {
    works: "Œuvres",
    bio: "Bio",
    inSitu: "In situ",
    publications: "Publications",
    contact: "Contact",
  },
  newsletter: {
    title: "Newsletter",
    placeholder: "Votre e-mail",
    submit: "S’inscrire",
  },
  social: {
    title: "Réseaux",
    instagram: "Instagram",
    facebook: "Facebook",
    youtube: "YouTube",
  },
  gallery: {
    all: "Tout",
    paintings: "Peintures",
    sculptures: "Sculptures",
    painting: "Peinture",
    sculpture: "Sculpture",
    emptyCategory: "Aucune œuvre dans cette catégorie.",
    emptyGallery: "Les œuvres seront bientôt disponibles.",
    loadMore: "Voir plus",
  },
  hero: {
    imageAlt: "Esclaves du sexe : Ben Mbuyulu, peinture, Mystère du voile",
  },
  bio: {
    lead:
      "Peintre et sculpteur, Ben Mbuyulu mène une recherche autour du voile comme symbole : ce qui cache, protège, révèle ou transforme.",
    p1: "L’artiste peintre sculpteur Ben Mbuyulu est né en 2006 à Kinshasa. Élève de l’artiste Amani Bodo, Ben Mbuyulu s’initie à l’âge de 18 ans à la création artistique, plus précisément en peinture, et à l’âge de 20 ans comme artiste de formation à l’Académie des Beaux-Arts de Kinshasa, au département de sculpture.",
    p2: "L’artiste rassemble les deux disciplines pour lancer un projet intitulé Mystère du voile, un espace de recherche autour du voile comme symbole : il peut cacher, protéger, révéler, séparer, soutenir et transformer. Le projet interroge aussi ce que l’être humain choisit de montrer ou de dissimuler.",
    p3: "À travers sa démarche, Ben Mbuyulu cherche à produire des œuvres accessibles, sensibles et porteuses de réflexion, en mettant l’être humain au centre de son questionnement artistique. En peinture, il a créé son style de fond pour rendre ses œuvres si uniques.",
    born: "Né en 2006 à Kinshasa (RDC).",
  },
  share: {
    action: "Partager le portfolio",
    copied: "Lien copié",
  },
  sections: {
    inSituSoon: "Les projets in situ seront bientôt listés ici.",
    publicationsSoon: "Les publications seront bientôt listées ici.",
  },
  footer: {
    rights: "Ben Mbuyulu. Tous droits réservés.",
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof fr>;
