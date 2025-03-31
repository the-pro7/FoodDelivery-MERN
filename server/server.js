import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import FoodRoutes from "./routes/FoodRoutes.js";
import RefreshUserRoute from "./routes/refreshTokenRoute.js"
import logStuff from "./middleware/logger.js"
import { connectDB, log } from "./utils.js";

const PORT = process.env.PORT || 8000

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json({ limit: "50mb" })); // Prevents DoS attacks
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", logStuff, UserRoutes);
app.use("/api/food/", logStuff, FoodRoutes);
app.use("/api/refresh", logStuff, RefreshUserRoute)



// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const cause = err.cause || new Error(err).cause
  return next(res.status(status).json({
    success: false,
    status,
    message,
    cause
  }))
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});




app.listen(PORT, () => {
  // Connect DB
  connectDB();
  log(`Server running on  ${PORT}`)
});

