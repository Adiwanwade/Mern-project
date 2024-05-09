// Import necessary modules
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model.js'; // Adjust the path as necessary

// Load environment variables
dotenv.config();

// MongoDB connection string
const mongoURI = process.env.MONGO;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seeder function to create an admin user
const seedAdmin = async () => {
  try {
    // Attempt to find the admin user
    const adminExists = await User.findOne({ email: 'adityadummy@gmail.com' });

    if (adminExists) {
      console.warn('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('aditya@2004', 10);

    // Create admin user
    const adminUser = new User({
      username: 'Aditya',
      email: 'adityadummy@gmail.com',
      password: hashedPassword,
      isAdmin: true, // Ensure this matches your schema field for admin users
    });

    await adminUser.save();
    console.log('Admin user created');

  } catch (error) {
    console.error(`Error seeding admin: ${error}`);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Connect to DB and run seeder
connectDB().then(seedAdmin);