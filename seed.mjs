import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// ================= মডেল স্ট্রাকচার =================

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  icon: { type: String },
  highlights: [{ type: String }]
}, { timestamps: true });

const newsSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  excerpt: { type: String, required: true },
  image: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const News = mongoose.models.News || mongoose.model('News', newsSchema);

// ================= ডেটা =================

const categories = [
  { slug: "dairy-nutrition", name: "Dairy nutrition", description: "Everyday nutrition support for healthy, productive cattle.", icon: "🐄" },
  { slug: "poultry-nutrition", name: "Poultry nutrition", description: "Balanced nutrition essentials for poultry farms.", icon: "🐔" },
  { slug: "animal-care", name: "Animal care", description: "Practical care products for a range of farm animals.", icon: "🌿" }
];

const products = [
  {
    slug: "dairy-mineral-mix",
    name: "Dairy Mineral Mix",
    category: "Dairy nutrition",
    categorySlug: "dairy-nutrition",
    description: "A daily mineral supplement formulated to support balanced cattle nutrition.",
    price: 1250,
    unit: "5 kg bag",
    icon: "🐄",
    highlights: ["Designed for daily feeding routines", "Supports a balanced mineral intake", "Simple to add to a regular ration"]
  },
  {
    slug: "poultry-vitamin-blend",
    name: "Poultry Vitamin Blend",
    category: "Poultry nutrition",
    categorySlug: "poultry-nutrition",
    description: "A convenient vitamin blend to complement a balanced poultry feeding program.",
    price: 780,
    unit: "1 kg pack",
    icon: "🐔",
    highlights: ["Easy-to-use powder format", "Suitable for routine nutrition plans", "Clear feeding guidance on pack"]
  },
  {
    slug: "herbal-care-solution",
    name: "Herbal Care Solution",
    category: "Animal care",
    categorySlug: "animal-care",
    description: "A general-purpose herbal care product for responsible animal husbandry.",
    price: 950,
    unit: "500 ml bottle",
    icon: "🌿",
    highlights: ["Convenient liquid format", "For use as directed on the product label", "Ask our team about suitability for your animals"]
  }
];

const newsData = [
  {
    slug: "lumpy-skin-disease-prevention",
    title: "How to Protect Your Cattle from Lumpy Skin Disease",
    category: "Dairy",
    date: "2025-04-06",
    author: "Al-Shifa",
    excerpt: "Early vaccination and good farm hygiene are the best defence against lumpy skin disease. Learn the key steps every farmer should follow.",
    image: { src: "https://i.ibb.co.com/vCT72W03/f1710779881a3963116c0c771986e96a.jpg", alt: "Veterinarian checking cattle in a dairy farm" },
  },
  {
    slug: "poultry-winter-care",
    title: "Winter Care Tips for Healthy Poultry Flocks",
    category: "Poultry",
    date: "2025-04-04",
    author: "Al-Shifa",
    excerpt: "Cold weather can lower egg production and weaken immunity. Simple changes in housing and feed can keep your flock strong.",
    image: { src: "https://i.ibb.co.com/Qjc2zhSH/istockphoto-1219793101-612x612.jpg", alt: "Veterinarian vaccinating a hen" },
  },
  {
    slug: "aqua-water-quality",
    title: "Managing Water Quality in Fish Ponds",
    category: "Aqua",
    date: "2025-04-01",
    author: "Al-Shifa",
    excerpt: "Oxygen, pH and ammonia levels decide the health of your fish. Here is a simple routine to monitor and balance your pond water.",
    image: { src: "https://i.ibb.co.com/vCT72W03/f1710779881a3963116c0c771986e96a.jpg", alt: "Fish pond water quality testing" },
  },
  {
    slug: "pet-vaccination-guide",
    title: "Pet Vaccination Schedule Every Owner Should Know",
    category: "Pet",
    date: "2025-03-28",
    author: "Al-Shifa",
    excerpt: "From puppies to kittens, timely vaccination protects pets from common diseases. Check the basic schedule and talk to your vet.",
    image: { src: "https://i.ibb.co.com/Qjc2zhSH/istockphoto-1219793101-612x612.jpg", alt: "Vet vaccinating a pet" },
  },
  {
    slug: "mineral-mixture-for-cattle",
    title: "Why Mineral Mixture Matters for Dairy Cattle",
    category: "Dairy",
    date: "2025-03-25",
    author: "Al-Shifa",
    excerpt: "Mineral deficiency reduces milk yield and fertility. Learn how a balanced mineral supplement improves herd performance.",
    image: { src: "https://i.ibb.co.com/vCT72W03/f1710779881a3963116c0c771986e96a.jpg", alt: "Cattle eating feed in a barn" },
  },
  {
    slug: "broiler-gut-health",
    title: "Improving Gut Health in Broiler Chickens",
    category: "Poultry",
    date: "2025-03-20",
    author: "Al-Shifa",
    excerpt: "A healthy gut means better feed conversion and faster growth. Discover practical ways to support digestion in your broilers.",
    image: { src: "https://i.ibb.co.com/Qjc2zhSH/istockphoto-1219793101-612x612.jpg", alt: "Broiler chickens in a poultry shed" },
  },
  {
    slug: "shrimp-disease-control",
    title: "Preventing Common Diseases in Shrimp Farming",
    category: "Aqua",
    date: "2025-03-15",
    author: "Al-Shifa",
    excerpt: "Biosecurity and regular health checks reduce losses in shrimp farms. Here are the key points to keep in mind this season.",
    image: { src: "https://i.ibb.co.com/vCT72W03/f1710779881a3963116c0c771986e96a.jpg", alt: "Shrimp farm pond" },
  },
  {
    slug: "pet-nutrition-basics",
    title: "Nutrition Basics for a Healthy Pet",
    category: "Pet",
    date: "2025-03-10",
    author: "Al-Shifa",
    excerpt: "Balanced food, clean water and regular check-ups keep your pet active. A short guide to feeding your companion right.",
    image: { src: "https://i.ibb.co.com/Qjc2zhSH/istockphoto-1219793101-612x612.jpg", alt: "Healthy dog eating from a bowl" },
  },
];

// ================= ইমপোর্ট ফাংশন =================

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // আগের ডেটা মুছে ফেলা
    await Category.deleteMany();
    await Product.deleteMany();
    await News.deleteMany();

    // নতুন ডেটা ঢোকানো
    await Category.insertMany(categories);
    await Product.insertMany(products);
    await News.insertMany(newsData);

    console.log('✅ Data Imported Successfully to MongoDB Atlas!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();