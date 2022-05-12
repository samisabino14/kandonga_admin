
import express from "express";

import { loginRoute } from './controllers/loginControl.js';
import { logoutRoute } from './controllers/logoutControl.js';

import ridersRoute from './routes/riderRoute.js';
import driversRoute from './routes/driverRoute.js';
import homeRouter from './routes/homeRoute.js';
import races from './routes/racesRoute.js';
import { availableDriversRef } from '../app.js'


const router = express.Router();


router.use('/riders', ridersRoute);

router.use('/drivers', driversRoute);

router.get('/login', loginRoute);

router.get('/', homeRouter);

router.get('/races', (req, res) => {

    availableDriversRef.orderByChild('name').on('value', snapshot => {
        
        var availableDrivers = []

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            availableDrivers.push(item);      
        });

        res.status(200).render('races', {availableDrivers: availableDrivers});
    })
});

router.get('/logout', logoutRoute);


export default router;
