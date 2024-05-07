import './database/connection.js'
import express from 'express';
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';
import path from 'path';
import { unlink } from 'fs';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    if(req.method === 'OPTIONS'){
        return res.status(200).json({});
    }
    next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw new HttpError('Page does not exist', 404);
});

// special error handler middleware
app.use((error, req, res, next) => {
    if (req.file) {
        unlink(req.file.path, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res
        .status(error.code || 500)
        .json({
            message: error.message || 'Server error'
        });
});

const port = 3000;
app.listen(port);
console.log('Server listening at port:', port);