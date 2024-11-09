// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const wasteItemRoutes = require("./routes/wasteItemRoutes");

dotenv.config();
const app = express();

// Middleware xử lý JSON và URL encoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("MongoDB connection error:", error));

// Đăng ký các tuyến cho waste items
app.use("/waste-items", wasteItemRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Waste Item service running on port ${PORT}`);
});
