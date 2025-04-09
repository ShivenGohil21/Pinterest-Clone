import mongoose from 'mongoose';

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "pinterest",
        });
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Database Connection Error: ",error);
        process.exit(1);
    }
};

export default connectDb;  