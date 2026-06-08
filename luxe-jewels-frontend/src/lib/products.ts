// Central product data — admin can modify this later via backend
export type Product = {
  id: string;
  name: string;
  price: string;
  image: string; // path in /public/products/
  slug: string;
  collections: string[]; // which collection slugs this product appears in
  featured?: boolean;
};

export const products: Product[] = [];

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collections.includes(slug));
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export const collectionDescriptions: Record<string, string> = {
  "rings": "From timeless solitaires to modern statement designs, our ring collection is crafted to celebrate every moment. Each piece is thoughtfully designed with precision, brilliance, and enduring elegance.",
  "solitaire-rings": "From timeless solitaires to modern statement designs, our ring collection is crafted to celebrate every moment. Each piece is thoughtfully designed with precision, brilliance, and enduring elegance.",
  "engagement-rings": "Begin forever with a ring as extraordinary as your love story. Our engagement rings combine exceptional craftsmanship with lab-grown IGI certified diamonds.",
  "halo-rings": "Surrounded by a breathtaking halo of diamonds, each ring is designed to amplify the brilliance of the center stone.",
  "three-stone-rings": "Symbolising the past, present, and future, our three stone rings are crafted to celebrate milestones and lasting love.",
  "bands": "Refined, timeless, and crafted to last a lifetime. Our diamond bands are designed for everyday elegance.",
  "earrings": "From understated studs to statement hoops, our earring collection is designed to enhance your natural radiance.",
  "studs": "Classic and versatile, our diamond studs are crafted to complement every look—from everyday elegance to special occasions.",
  "halo-studs": "Surrounded by a luminous halo of diamonds, these earrings amplify your sparkle with graceful sophistication.",
  "diamond-hoops": "Our diamond hoops combine the classic hoop silhouette with the brilliance of lab-grown diamonds for a modern luxury finish.",
  "necklaces": "Effortlessly elegant, our necklace collection features lab-grown diamond pendants that speak softly yet leave a lasting impression.",
  "solitaire-pendants": "A single, stunning diamond suspended in refined simplicity. Our solitaire pendants are designed for the woman who appreciates understated luxury.",
  "halo-pendants": "A brilliant center stone wrapped in a sparkling halo—our halo pendants create a captivating focal point for any neckline.",
  "bracelets": "Adorning your wrist with brilliance—our bracelet collection includes tennis, chain, and statement designs in lab-grown diamonds.",
  "tennis-bracelets": "The epitome of classic elegance, our tennis bracelets feature a continuous line of perfectly matched lab-grown diamonds.",
  "chain-bracelets": "Delicate yet dazzling, our diamond chain bracelets bring a subtle sparkle to every wrist.",
  "statement-bracelets": "Make a statement with bold, breathtaking diamond bangle and cuff designs, crafted for the confident and the bold.",
};
