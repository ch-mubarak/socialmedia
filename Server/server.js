import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import express from "express";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRouter.js";
import PostRoute from "./Routes/PostRoute.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
connectDB();

//Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server up and running on ${PORT.yellow}`));
