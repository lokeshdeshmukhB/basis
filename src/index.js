// src/index.js

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { DB_NAME } from "./constants.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port ${process.env.PORT} and connected to DB: ${DB_NAME}`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server running...");
// });

// const PORT = process.env.PORT || 5000;

// (async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (error) {
//     console.error("Server startup error:", error);
//   }
// })();

/*
import express from express;
const app=express();
(async () => {
  try{
    mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error",(error)=>{
      console.log("Error while connecting to the database",error);
      throw error
    });
    app.listen(process.env.PORT,()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }catch(error){
    console.error("Error while connecting to the database",error);
    throw err
  }})();
*/
// Connecting to the database
