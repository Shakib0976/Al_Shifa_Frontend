import mongoose from 'mongoose';

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

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;