
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./lib/mongodb")
const proxyMiddleware = require('./middelwares/proxy');
require('dotenv').config();
proxyMiddleware(app);

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

app.use(bodyParser.json());
mongodb.connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
//ROUTES
app.use("/live", channelRoutes);

module.exports = app;