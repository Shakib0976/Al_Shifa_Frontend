import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // আগের অ্যাডমিন মুছে ফেলা (ঐ ইমেইলে)
    await User.deleteMany({ email: "admin@alshifa.com" });

    // পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@alshifa.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@alshifa.com');
    console.log('🔑 Password: admin123');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();