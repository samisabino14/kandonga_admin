import express from 'express';

import { homeKandonga } from '../controllers/homeControl.js';

const routerHome = express.Router();



routerHome.get('/', homeKandonga);



export default routerHome;