require("dotenv").config(); // Load env variables

const express = require("express");
const connectDB = require("./server/config/server");
const Package = require("./routes/packages");

const app = express();

app.use(express.json()); // Parse incoming req bodies

// Log incoming req details
app.use((req, res, next) => {
  console.log("Incoming request:");
  console.log("Req:", req.method);
  console.log("Path:", req.path);
  next();
});

connectDB(); // Connection to database

// Route handler for POST request to get package info
app.use("/getPackages", Package);

const PORT = process.env.PORT || 5000; // Port number
app.listen(PORT, () => {
  console.log(`Server is now listening on port http:localhost:${PORT}`);
});
