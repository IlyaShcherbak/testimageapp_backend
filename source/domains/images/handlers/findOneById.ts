// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

const debug = dg('router:images');

export const findOneById = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    const _id = req.params._id;

    try {
        const image = await Images.findOneById(_id);

        res.status(200).json(image);
    } catch (error) {
        res.send(error);
    }
};
