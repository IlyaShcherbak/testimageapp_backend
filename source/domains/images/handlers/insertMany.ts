// Core
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

const debug = dg('router:images');

interface IRequest extends Request {
    files?: Array<File & { path: string; }>
}

type CloudinaryResonse = Array<{ secure_url: string, public_id: string,
    isFavourite: boolean, title: string }>;

export const insertMany = async (req: IRequest, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.files) {
            throw new Error('Files do not exist or broken');
        }

        const values = Object.values(req.files);
        const promises = values.map((image) => cloudinary.uploader.upload(image.path));

        const response: any = await Promise.all(promises);
        const imagesUrlsArray = response.map((
            { secure_url, public_id, isFavourite, title }: any,
        ) => ({
            imageUrl: secure_url, public_id, isFavourite, title,
        }));

        const data = await Images.insertMany(imagesUrlsArray);
        // const mappedData = data.map(({ imageUrl, public_id, isFavourite, title }) => (
        //     { imageUrl, public_id, isFavourite, title }
        // ));

        res.status(200).json(data);
    } catch (error) {
        res.send(error);
    }
};
