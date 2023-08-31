// Core
import { Model } from 'mongoose';

// Instruments
import { imagesModel, IImagesModel } from './schema';
import { ImageCore, Image } from './types';

class ImagesController {
    private readonly odm: Model<IImagesModel>;

    constructor() {
        this.odm = imagesModel;
    }

    async getAll(): Promise<Image[]> {
        const data = await this.odm.find()
            .lean();

        return data;
    }

    async findOneById(_id: string): Promise<Image[]> {
        const data = await this.odm.find({_id})
            .select('-_id')
            .lean();

        return data;
    }

    async insertMany(body: ImageCore[]): Promise<Image[]> {
        const data = await this.odm.insertMany(body);


        return data;
    }

    async findOneAndRemove(public_id: string): Promise<boolean> {
        await this.odm.findOneAndRemove({ public_id });

        return true;
    }

    async updateOne(_id: string, data: ImageCore): Promise<boolean> {
        await this.odm.updateOne({ _id }, { ...data });

        return true;
    }
}

export const Images = new ImagesController();
