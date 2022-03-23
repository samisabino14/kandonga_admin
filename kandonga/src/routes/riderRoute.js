
import express from "express";

import {

    getRiders,
    getRiderByEmail,
    addRider,
    editRider,
    updateRider,
    deleteRider,
    

} from "../controllers/RequestRidersControl.js";


const riderRouter = express.Router();


riderRouter.get('/', getRiders);

riderRouter.get('/:email', getRiderByEmail);

riderRouter.put('/', updateRider);

riderRouter.post('/', updateRider);

riderRouter.post('/', addRider);

riderRouter.delete('/', deleteRider);


export default riderRouter;
