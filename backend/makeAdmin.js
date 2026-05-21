import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/User.js';

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');

    await User.updateMany({}, { isAdmin: false });
    const result = await User.updateOne({ email: 'jinay2910@gmail.com' }, { isAdmin: true });
    
    if (result.matchedCount === 0) {
      console.log('User jinay2910@gmail.com not found. Admin assignment failed.');
    } else {
      console.log(`Demoted all users. Successfully assigned Admin rights to jinay2910@gmail.com.`);
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

makeAdmin();
