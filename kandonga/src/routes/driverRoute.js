
import express from "express";

import {

    getDrivers,
    getDriverByEmail
    

} from "../controllers/RequestDriversControl.js";


const driversRouter = express.Router();


driversRouter.get('/', getDrivers);

driversRouter.get('/:email', getDriverByEmail);


export default driversRouter;
