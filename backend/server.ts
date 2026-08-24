import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});