// Registry of module models
import HotelsModel from './hotels.js';
import OffersModel from './offers.js';

const models = {
    hotels: new HotelsModel(),
    offers: new OffersModel()
};

export default models;
