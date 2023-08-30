// Core
import express, { Request, Response, NextFunction, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import formData from 'express-form-data';
import { v2 as cloudinary } from 'cloudinary';
import dg from 'debug';

// Routes
import { images } from './domains';

// Instruments
import { getCloudinaryEnv, NotFoundError, ValidationError } from './helpers';
import { requireJsonContent } from './middlewares';

// Initialize DB connection
import './db';

const app: Application = express();
const debug = dg('server:init');

const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
} = getCloudinaryEnv();

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:    API_KEY,
    api_secret: API_SECRET,
});

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
    credentials: true,
    origin:      [
        'http://localhost',
        'http://localhost:3000', // dev
        'http://localhost:5000', // serve
    ],
}));
app.use(formData.parse());
app.use(requireJsonContent);

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body = req.method === 'GET'
            ? 'Body not supported for GET'
            : JSON.stringify(req.body, null, 2);

        debug(`${req.method}\n${body}`);
        next();
    });
}

app.use([ images ]);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError(`Route not found ${req.method} — '${req.originalUrl}'`, 404);
    next(error);
});

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: ValidationError | NotFoundError, req: Request, res: Response, next: NextFunction) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        debug(`Error: ${errorMessage}`);

        const status = statusCode || 500;
        res.status(status).json({ message });
    },
);

export { app };
