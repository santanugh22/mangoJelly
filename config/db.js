import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected...");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

export { sequelize, connectDB };
