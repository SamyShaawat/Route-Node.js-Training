import mongoose from 'mongoose';


const connectionDB = async () => {
    await mongoose.connect(process.env.URI_CONNECTION)
        .then(() => {
            console.log(`Connected to MongoDB ${process.env.DB_Name} ...`);
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB: ", err);

        })
}

export default connectionDB;