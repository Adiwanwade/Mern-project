import cors from 'cors';
import express from 'express';
import usersRoutes from './routes/user.route.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { unlink } from 'fs';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import dotenv from 'dotenv';
import 'dotenv/config';
import mongoose from 'mongoose';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());
// const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // If using cookies
};

app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});