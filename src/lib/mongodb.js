const mongoose = require('mongoose');

let mongoClient;

if (process.env.MONGODB_URI === null) {
    console.log("Please add MONGODB_URI env to your env file !")
}

async function connectToDatabase() {

    if (mongoClient) {
        return { mongoClient }
    } else {
        try {
            mongoClient = await mongoose.connect(process.env.MONGODB_URI)
            console.log('just connected')
            return { mongoClient }

        } catch (e) {
            console.error(e)
        }
    }


}


module.exports = { connectToDatabase };