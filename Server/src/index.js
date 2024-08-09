import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './Routes/user.js' 
import { reciperouter } from "./Routes/recepis.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)
app.use("/recipes", reciperouter)

app.get('/', (req, res) => {
  res.json({message: "hello world"});                                                                   
})

mongoose.connect(  //To connect to the mongodb
  "mongodb://localhost:27017/Recepiz"
).then(() => {
  app.listen(3001, () => {
    console.log("Server started");
  });
}); 

