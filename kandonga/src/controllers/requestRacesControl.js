
import { availableDriversRef } from '../../app.js'


export const getRaces = (req, res) => {
  
    availableDriversRef.child().on('value', snapshot => {
        
        var races = []

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            races.push(item);   
        });
        
        res.status(200).render('races', {races: races});

    })}