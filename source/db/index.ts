// Core
import { connect, ConnectOptions } from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbUrl } from '../helpers';

const debug = dg('db');
const DB_URL = getDbUrl();

// const mongooseOptions: ConnectOptions = {
//     promiseLibrary:     global.Promise,
//     keepAlive:          true,
//     connectTimeoutMS:   5000,
//     useFindAndModify:   false,
//     useCreateIndex:     true,
//     useUnifiedTopology: true,
// };

const connection = connect(DB_URL);

connection
    .then(() => {
        debug('DB connected');
    })
    .catch(({ message }) => {
        debug(`DB connectionError: ${message}`);
    });
