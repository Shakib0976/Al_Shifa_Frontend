import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;