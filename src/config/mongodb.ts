import mongoose from 'mongoose';

const _URL = "mongodb+srv://julianDB:Js12345@dbiii.z1yfgko.mongodb.net/?retryWrites=true&w=majority&appName=DBIII";

mongoose.set("useFindAndModify", false);
mongoose.connect(_URL || process.env.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export {mongoose};