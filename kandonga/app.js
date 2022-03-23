
const GOOGLE_APPLICATION_CREDENTIALS='/home/sams14/Desktop/kandonga/kandonga77-bbfd7-firebase-adminsdk-uvgg9-386182b2d1.json'

export {

    GOOGLE_APPLICATION_CREDENTIALS
} 


/* _______________________________________________________________________________________

    IMPORTS
__________________________________________________________________________________________ */

import express from "express";
import csrf from 'csurf'
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import createError from "http-errors";
import { initializeApp } from 'firebase-admin/app';
import router from './src/routes.js';
import admin from 'firebase-admin'



/* _______________________________________________________________________________________

    DECLARATION CONST
__________________________________________________________________________________________ */

const app = express();
const PORT = 5000;
const csrfMiddleware = csrf({ cookie: true });

/* 
import serviceAccount from "/home/sams14/Desktop/kandonga/kandonga77-bbfd7-firebase-adminsdk-uvgg9-386182b2d1.json";
 */



/* _______________________________________________________________________________________

    ENGINE VIEW SETUP
__________________________________________________________________________________________ */

app.engine('hbs', engine({ layoutsDir: './views/layouts', extname: 'hbs' }));
app.set('views', path.join('./views'));
app.set('view engine', 'hbs');


/* _______________________________________________________________________________________

    MIDDLEWARE
__________________________________________________________________________________________ */

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(express.json())

app.use(cookieParser());
app.use(csrfMiddleware);


app.all('*', (req, res, next) => {

    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
})



/* _______________________________________________________________________________________

    FIREBASE
__________________________________________________________________________________________ */


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://kandonga77-bbfd7-default-rtdb.firebaseio.com"
});


const db = admin.database();
const userRef = db.ref('/users')
const driverRef = db.ref('/drivers')
const availableDriversRef = db.ref('/availableDrivers')
const rideRequest = db.ref('/rideRequest')
 
/* _______________________________________________________________________________________

    ROUTES
__________________________________________________________________________________________ */

app.get('/', (req, res) => {

    res.status(200).sendFile(path.resolve() + '/views/home.html');
});

app.get('/signin_admin', (req, res) => {

    res.status(200).sendFile(path.resolve() + '/views/auth-login.html');
});

app.post('/signin_admin', (req, res) => {

    console.log("SIGNIN");
    res.redirect('/kandonga');
});

app.use('/kandonga', router);

app.post('/kandonga', (req, res) => {

    console.log(req.body.email)

/*     const userID = userRef.push().key;

    userRef.child(userID).set({

        id: userID,
        email: req.body.email || '',
        name: req.body.name || '',
        phone: req.body.phone || ''
    })
    
    userRef.on("child_added", snapshot => {
        console.log('Novo utilizador adicionado à Base de Dados!');
    })
 */
    res.redirect('/kandonga/riders');
    
});


export {
    userRef,
    driverRef,
    availableDriversRef,
    rideRequest    
} 

/* _______________________________________________________________________________________

    LISTEN FUNCTION
__________________________________________________________________________________________ */

app.listen(PORT, () => {

    console.log(`SERVER RUNNING IN http://localhost:${PORT}`);
});



