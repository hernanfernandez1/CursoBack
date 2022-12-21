import mongoose from 'mongoose';
import config from '../config/config.js';  

export const initDb = () => {
    return mongoose.connect(config.MONGO_ATLAS_URL);
}
