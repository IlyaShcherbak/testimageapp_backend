// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

const route = express.Router();

route.get('/images',  methods.getAll);
route.get('/images/:_id',  methods.findOneById);
route.post('/images', methods.insertMany);
route.post('/images/:_id/update', methods.updateImage);
route.delete('/images/:public_id', methods.findOneAndRemove);

export { route as images };
