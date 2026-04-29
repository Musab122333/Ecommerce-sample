import headphones from "@/assets/product-headphones.jpg";
import watch from "@/assets/product-watch.jpg";
import perfume from "@/assets/product-perfume.jpg";
import sneaker from "@/assets/product-sneaker.jpg";
import chair from "@/assets/product-chair.jpg";
import bag from "@/assets/product-bag.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "aura-headphones",
    name: "Aura Wireless Headphones",
    price: 349,
    category: "Audio",
    image: headphones,
    description: "Studio-grade noise cancellation wrapped in pearl and rose gold. 40-hour battery, spatial audio.",
    rating: 4.9,
    badge: "Bestseller",
  },
  {
    id: "halo-watch",
    name: "Halo Iridescent Smartwatch",
    price: 459,
    category: "Wearables",
    image: watch,
    description: "Holographic strap, always-on AMOLED, 7-day battery. Health tracking that feels like jewelry.",
    rating: 4.8,
    badge: "New",
  },
  {
    id: "rose-perfume",
    name: "Rose Quartz Eau de Parfum",
    price: 129,
    category: "Beauty",
    image: perfume,
    description: "Pink pepper, Bulgarian rose, and warm amber. A signature scent in frosted glass.",
    rating: 4.7,
  },
  {
    id: "pearl-sneakers",
    name: "Pearl Lilac Sneakers",
    price: 219,
    category: "Footwear",
    image: sneaker,
    description: "Premium leather with iridescent finish. Cloud-soft sole, all-day comfort.",
    rating: 4.6,
  },
  {
    id: "lilac-lounge",
    name: "Lilac Lounge Chair",
    price: 899,
    category: "Home",
    image: chair,
    description: "Sculptural mid-century silhouette in soft lilac velvet on brushed brass legs.",
    rating: 4.9,
    badge: "Limited",
  },
  {
    id: "lavender-tote",
    name: "Lavender Heritage Tote",
    price: 549,
    category: "Bags",
    image: bag,
    description: "Hand-stitched Italian leather with 18k gold-plated hardware. Built for a lifetime.",
    rating: 4.8,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
