import mongoose from "mongoose";

let isConnected = false; // Track the connection status

// Function to connect to MongoDB
const connectDB = async () => {
  mongoose.set('strictQuery', true); // Optional: Enables strict mode for queries

  // Check if already connected
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // Establish connection to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptgen", // Specify the database name
      useNewUrlParser: true, // Use new URL parser (recommended)
      useUnifiedTopology: true, // Use the new topology engine (recommended)
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    isConnected = true; // Update connection status
    console.log("MongoDB connected successfully");

    // Optional: Event listeners to handle connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      isConnected = false; // Reset connection status on error
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
      isConnected = false; // Reset connection status on disconnection
    });

  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};

export { connectDB };
