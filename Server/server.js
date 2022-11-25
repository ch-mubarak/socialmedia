import * as dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import connectDB from "./config/db.js";
import express from "express";
import AuthRoute from "./Routes/AuthRoute.js"

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
connectDB();

//Routes
app.use("/auth",AuthRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server up and running on ${PORT.yellow}`));
