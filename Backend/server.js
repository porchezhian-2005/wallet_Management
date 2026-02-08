import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log(" MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(` Wallet API server running on port ${PORT}`);
      console.log(` Test endpoint: /api/test`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err.message);
  });
