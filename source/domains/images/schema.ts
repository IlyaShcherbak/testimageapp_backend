// Core
import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Types
import { ImageCore } from './types';

export interface IImagesModel extends Document, ImageCore {}

// Document shape
const schema = new mongoose.Schema({
    imageUrl: {
        type:     String,
        required: true,
    },
    public_id: {
        type:     String,
        required: true,
        unique:   true,
    },
    title: {
        type:   String,
        unique: false,
    },
    isFavourite: {
        type: Boolean,
    },
}, {
    id:         true,
    versionKey: false,
});

schema.plugin(uniqueValidator);

// Collection
export const imagesModel = mongoose.model<IImagesModel>('images', schema);
