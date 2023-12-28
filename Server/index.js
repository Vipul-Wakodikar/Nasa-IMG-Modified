const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}))

app.get("/", (req, res) => {
  res.send("Backend is running baby");
});
app.get("/apod", (req, res) => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
  )
    .then((resObj) => resObj.json())
    .then((data) => res.json(data));
});
app.listen(5000, () => console.log("Backend is running"));
