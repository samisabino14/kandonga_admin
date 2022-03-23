import express from "express";

import {

    getRaces

} from "../controllers/requestRacesControl.js"


const raceRoute = express.Router()


raceRoute.get('/', getRaces)


export default raceRoute

