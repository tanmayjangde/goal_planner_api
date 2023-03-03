const mongoose = require('mongoose');

const connectDB = async() => {

    try {
        const conn = await mongoose.connect("mongodb+srv://tanmaygp:gpcuvette@cuvette.iklhhhr.mongodb.net/?retryWrites=true&w=majority");
        console.log(`Mongo Connected ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;