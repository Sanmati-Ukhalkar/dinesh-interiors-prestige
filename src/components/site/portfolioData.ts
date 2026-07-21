import kitchen from "@/assets/portfolio-kitchen.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";
import living from "@/assets/portfolio-living.jpg";
import storage from "@/assets/portfolio-storage.jpg";
import hero from "@/assets/hero.jpg";
import fusion from "@/assets/style-fusion.jpg";
import traditional from "@/assets/style-traditional.jpg";
import modern from "@/assets/style-modern.jpg";

export type Category = "Kitchen" | "Bedroom" | "Living" | "Storage";

export type PortfolioItem = {
  title: string;
  category: Category;
  place: string;
  img: string;
  ratio: string;
};

export const portfolioItems: PortfolioItem[] = [
  { title: "Marble & Brass Kitchen", category: "Kitchen", place: "Pune Residence", img: kitchen, ratio: "aspect-[4/5]" },
  { title: "Carved Heritage Bedroom", category: "Bedroom", place: "Jaipur Villa", img: bedroom, ratio: "aspect-[3/4]" },
  { title: "Arched Living Room", category: "Living", place: "Pune Apartment", img: living, ratio: "aspect-[4/3]" },
  { title: "Walk-in Wardrobe", category: "Storage", place: "Whitefield Home", img: storage, ratio: "aspect-[3/4]" },
  { title: "Dawn Sitting Hall", category: "Living", place: "Hyderabad Home", img: hero, ratio: "aspect-[3/4]" },
  { title: "Fusion Lounge", category: "Living", place: "Pune Penthouse", img: fusion, ratio: "aspect-[4/5]" },
  { title: "Heritage Drawing Room", category: "Living", place: "Udaipur Haveli", img: traditional, ratio: "aspect-[3/4]" },
  { title: "Minimal Master Bedroom", category: "Bedroom", place: "Bandra Apartment", img: modern, ratio: "aspect-[4/5]" },
];
