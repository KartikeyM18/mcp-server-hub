
import * as dotenv from 'dotenv';
import { connectDB } from './db/index.js';
dotenv.config();

import app from './app.js';

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error);
  });


app.on("error", (error) => {
  console.error("❌ Express app error:", error);
});
