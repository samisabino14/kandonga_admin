import fetch from "node-fetch";
import { driverRef, rideRequest } from '../../app.js'

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
    var driver = {};
    var driverId = null;
    var fareAmount = 0;
    var amountDriver = 0;
    var amountEnterprise = 0;
    var historic = [];
    
    driverRef.orderByChild('name').on('value', snapshot => {

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            if ( item.email == email ) {

                driver = item;
                driverId = driver.id;

                rideRequest.orderByChild('fareAmount').on('value', snapshot => {

                    snapshot.forEach(function(childSnapshot) {
            
                        var item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        
                        if ( item.driverId == driverId ) {

                            fareAmount += Number(item.fareAmount);

                            historic.push(item);
                        }
                    });
                })
            }            
        });
    })
    
    res.status(200).render('listDriverByEmail', {

        driver: driver,
        fareAmount: (fareAmount).toFixed(2),
        amountDriver: (fareAmount * 0.9).toFixed(2),
        amountEnterprise: (fareAmount * 0.1).toFixed(2),
        historic: historic,

    });
}