export type Category = "Kitchen" | "Bedroom" | "Living" | "Storage";

export type PortfolioItem = {
  title: string;
  category: Category;
  place: string;
  img: string;
  ratio: string;
};

// 1. Fetch all media from the new folder
const rawImages = import.meta.glob('@/assets/new media/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const imageUrls = Object.values(rawImages) as string[];

// 2. Data pools for random generation
const categories: Category[] = ["Kitchen", "Bedroom", "Living", "Storage"];
const places = ["Pune Residence", "Jaipur Villa", "Pune Apartment", "Whitefield Home", "Hyderabad Home", "Pune Penthouse", "Udaipur Haveli", "Bandra Apartment"];
const titles = ["Marble & Brass", "Carved Heritage", "Arched Space", "Minimalist Design", "Dawn Sitting", "Fusion Elements", "Quiet Luxury", "Bespoke Details"];
const ratios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]"];

// 3. A simple seeded random function so the data doesn't change on every re-render (hydration mismatch)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

// 4. Generate the full portfolio items array dynamically!
export const portfolioItems: PortfolioItem[] = imageUrls.map((url, i) => {
  const catIdx = Math.floor(seededRandom(i * 10) * categories.length);
  const placeIdx = Math.floor(seededRandom(i * 20) * places.length);
  const titleIdx = Math.floor(seededRandom(i * 30) * titles.length);
  const ratioIdx = Math.floor(seededRandom(i * 40) * ratios.length);

  return {
    title: `${titles[titleIdx]} ${categories[catIdx]}`,
    category: categories[catIdx],
    place: places[placeIdx],
    img: url,
    ratio: ratios[ratioIdx],
  };
});
