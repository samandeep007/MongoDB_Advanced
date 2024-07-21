import mongoose from 'mongoose';

const connectDB = async() => {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`, {});
    connection.on('connection', () => {
        console.log("MongoDB connection successful")
    });
    connection.on('error', (error) => {
        console.error(error.message)
    });
}

export default connectDB;
