import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
     // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected");
    return
  }
try {
     // Attempt to connect to the database
   const db= await mongoose.connect(process.env.MONGODB_URI || '', {})

   connection.isConnected = db.connections[0].readyState

   console.log("DB is Connected successfully");

} catch (error) {
    console.log("Database connection failed", error);

    process.exit(1);
}
}

export default dbConnect;