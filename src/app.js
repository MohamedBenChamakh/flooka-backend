
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

const channelRoutes = require("./routes/channel");

//CROSS-ORIGIN
app.get((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(bodyParser.json())


//MONGO-DB CONNECTION
/*mongoose.connect('mongodb+srv://mohamedChamakh98:YbGVcqyUhYesGkzq@cluster-app.tkaut.mongodb.net/?retryWrites=true&w=majority&directConnection=true'
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
*/

mongoose.connect(process.env.MONGODB_URI
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//ROUTES
app.use("/live", channelRoutes);

module.exports = app;