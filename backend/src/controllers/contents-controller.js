import Content from '../models/content.js';
import HttpError from '../models/http-error.js';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

const getContents = async (req, res, next) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (error) {
        return handleError(error, next, 'Error while fetching contents');
    }
};

const getContentById = async (req, res, next) => {
    const contentId = req.params.id;

    try {
        const content = await Content.findById(contentId);

        if (!content) {
            throw new HttpError('Content not found', 404);
        }

        res.json(content);
    } catch (error) {
        return handleError(error, next, 'Error while fetching content by ID');
    }
};

const createContent = async (req, res, next) => {
    const { title, body } = req.body;

    try {
        const newContent = new Content({
            id: uuid(),
            title,
            body,
            author: req.user.userId // Assuming you're using JWT authentication and storing user ID in req.user.userId
        });

        const savedContent = await newContent.save();

        res.status(201).json(savedContent);
    } catch (error) {
        return handleError(error, next, 'Error while creating new content');
    }
};

const updateContent = async (req, res, next) => {
    const contentId = req.params.id;
    const { title, body } = req.body;

    try {
        let content = await Content.findById(contentId);

        if (!content) {
            throw new HttpError('Content not found', 404);
        }

        content.title = title;
        content.body = body;

        const updatedContent = await content.save();

        res.json(updatedContent);
    } catch (error) {
        return handleError(error, next, 'Error while updating content');
    }
};

const deleteContent = async (req, res, next) => {
    const contentId = req.params.id;

    try {
        const content = await Content.findById(contentId);

        if (!content) {
            throw new HttpError('Content not found', 404);
        }

        await Content.findByIdAndDelete(contentId);

        res.json({ message: 'Content deleted successfully' });
    } catch (error) {
        return handleError(error, next, 'Error while deleting content');
    }
};

const handleError = (error, next, message) => {
    if (error instanceof HttpError) {
        return next(error);
    }
    console.log(error);
    return next(new HttpError(message, 500));
};

export {
    getContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
};