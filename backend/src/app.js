const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
import User from '../models/user.js';
import Content from '../models/content';

// Routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');

// JWT Secret
const JWT_SECRET = 'yourJWTSecret';

// JWT Middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Token not provided' });
  }
};

app.use('/auth', authRoutes);
app.use('/content', requireAuth, contentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
