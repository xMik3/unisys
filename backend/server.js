import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});