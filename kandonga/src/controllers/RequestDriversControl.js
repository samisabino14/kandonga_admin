import fetch from "node-fetch";
import { driverRef } from '../../app.js'

let status = 0;


export const getDrivers = (req, res) => {    


    driverRef.orderByChild('name').on('value', snapshot => {
        
        var drivers = []

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            drivers.push(item);          
        });

        res.status(200).render('listAllDrivers', {drivers: drivers});
    })
}


export const getDriverByEmail = (req, res) => {
    
    const { email } = req.params;
    var driver = {}
        
    driverRef.orderByChild('name').on('value', snapshot => {

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            if(item.email == email) {

                driver = item;
            }            
        });
    })

    console.log(driver);

    res.status(200).render('listDriverByEmail', {driver: driver});
}