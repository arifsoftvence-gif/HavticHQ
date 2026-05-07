const mongoose = require('mongoose');
const uri = "mongodb+srv://freelancerarif68_db:9V4bmn-YZ.GcUQa@cluster0.396gl.mongodb.net/";

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log("SUCCESS: Connected to MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("ERROR: Could not connect to MongoDB", err);
    process.exit(1);
  }
}

testConnection();
