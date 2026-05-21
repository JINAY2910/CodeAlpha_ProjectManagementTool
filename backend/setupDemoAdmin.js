import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import 'dotenv/config';
import User from './models/User.js';

const setupDemoAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');

    // Demote all users
    await User.updateMany({}, { isAdmin: false });

    const email = 'admin123@gmail.com';
    const password = 'admin123';
    
    // Check if user exists
    let admin = await User.findOne({ email });
    
    if (admin) {
      // Update existing
      const salt = await bcryptjs.genSalt(10);
      admin.password = await bcryptjs.hash(password, salt);
      admin.isAdmin = true;
      admin.name = 'Admin';
      await admin.save();
      console.log('Updated existing demo admin.');
    } else {
      // Create new
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      admin = new User({
        name: 'Admin',
        email,
        password: hashedPassword,
        isAdmin: true
      });
      await admin.save();
      console.log('Created new demo admin.');
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

setupDemoAdmin();
