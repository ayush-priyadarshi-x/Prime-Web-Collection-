import mongoose from "mongoose";

interface isConnected {
  isConnected?: number;
}

const connection: isConnected = {};

async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("Database already connected. ");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Database connected successfully. ");
      return;
    }
    console.log("There was some error connecting the server. ");
  } catch (error) {
    console.log("Error connecting database : ", error);
  }
}
export default dbConnect;
