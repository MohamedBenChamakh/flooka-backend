require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./lib/mongodb")
const cors = require('cors');


//CROSS-ORIGIN
const corsOptions = {
    origin: ['https://flooka-tv.vercel.app','https://shls-m6-france-prod-dub.shahid.net','https://shls-spacetoon-prod-dub.shahid.net'], // Pass the allowed origins as an array
    methods: ['GET', 'POST'], // Optionally, specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Optionally, specify allowed headers
    credentials: true, // Optionally, enable credentials
};

app.use(cors(corsOptions));


const channelRoutes = require("./routes/channel");



app.use(bodyParser.json());
mongodb.connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
//ROUTES
app.use("/live", channelRoutes);

module.exports = app;