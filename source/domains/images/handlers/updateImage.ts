// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

// Types
import { ImageCore } from '../types';

const debug = dg('router:images');

export const updateImage = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    const _id = req.params._id;

    const body: ImageCore = req.body;

    try {
        const image = await Images.updateOne(_id, body);

        res.status(200).json(image);
    } catch (error) {
        res.send(error);
    }
};
