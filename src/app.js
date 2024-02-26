require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./lib/mongodb")
const proxyMiddleware = require('./middelwares/proxy');
proxyMiddleware(app);

const channelRoutes = require("./routes/channel");



app.use(bodyParser.json());
mongodb.connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
//ROUTES
app.use("/live", channelRoutes);

module.exports = app;