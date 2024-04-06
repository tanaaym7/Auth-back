const express = require("express");
const app = express();
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
require("dotenv").config();

app.use(cors({ origin: "https://stream-ai.netlify.app/", credentials: true }));

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB(process.env.MONGO_URL);

// Register routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
