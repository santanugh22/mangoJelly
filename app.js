import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import comicRoutes from "./routes/comicRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import Comic from "./models/comic.js";
import { sequelize } from "./config/db.js";
// import { seedComics } from "./seedData.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/comics", comicRoutes);

app.use(errorHandler);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

const PORT = process.env.PORT || 5000;
(async () => {
  await syncDatabase();
//   await seedData()

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
