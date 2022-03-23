import { userRef } from '../../app.js'

let status = 0;
let riders = {}
let rider = {}


function findOneUser(user, email) {

    for (var i = 0; i < user.length; i++) {

        if (user[i].email == email) {

            rider = user[i];
            status = 1;
        }
    }
}


export const getRiders = (req, res) => {    

    userRef.orderByChild('name').on('value', snapshot => {
        
        var riders = []

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            riders.push(item);
        });

        res.status(200).render('listAllRiders', {riders: riders});
    })
}


export const getRiderByEmail = (req, res) => {
    
    const { email } = req.params;
    var rider = {}
        
    userRef.orderByChild('name').on('value', snapshot => {

        snapshot.forEach(function(childSnapshot) {

            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            if(item.email == email) {

                rider = item;
            }            
        });
    })

    res.status(200).render('listRiderByEmail', {rider: rider});

}

export const newRider = (req, res) => {

    res.status(200).render('newRider')
}

export const addRider = (req, res) => {
   
    const userID = userRef.push().key;

    userRef.child(userID).set({

        id: userID,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    })
    
    userRef.on("child_added", snapshot => {
        console.log('Novo utilizador adicionado à Base de Dados!');
    })
}

export const editRider = (req, res) => {

  
    res.send("<h1>EDIT ROUTER RIDERS</h1>")
}

export const updateRider = (req, res) => {

    const newDate = {

        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    }

    console.log(req.body.id)
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.phone)

    console.log(newDate);
    
    userRef.child(req.body.id).update(newDate) 

    userRef.on("child_changed", snapshot => {
        console.log('Dados atualizados!');
    })

    res.render('index')
}

export const deleteRider = (req, res) => {
    
    const { email } = req.params

    console.log(email)
    
    userRef.child(email).remove();

    userRef.on("child_removed", snapshot => {
        console.log('Dados deletados!');
    })

    res.status(200).render('listAllRiders');
}

