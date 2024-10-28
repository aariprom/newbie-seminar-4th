import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from './db/db.config'; // Ensure this path is correct

import ArithRouter from "./routes/arithmetic";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
} satisfies CorsOptions;

app.use(cors(corsOptions));

app.use("/arithmetic", ArithRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* import sequelize from './db/db.config'; */
import Calc from './models/calc';

async function initializeDatabase() {
  try {
    console.log('trying to connect to db');
    const sequelize = await connectToDatabase(); // Connect to MySQL through SSH
    /* await sequelize.authenticate(); */
    console.log('Database connection has been established successfully.');
    
    /* await Calc.sync();
    console.log('Calc model synchronized with database.'); */
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();
