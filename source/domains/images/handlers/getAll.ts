// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Instruments
import { Images } from '../controller';

const debug = dg('router:images');

export const getAll = async (req: Request, res: Response) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const images = await Images.getAll();

        res.status(200).json(images);
    } catch (error) {
        res.send(error);
    }
};
