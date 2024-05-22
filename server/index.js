const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/UserRoute");
const port = 8080;

// creating an instance of the express
const app = express();
//middlewares
app.use(express.json());
app.use(cors());

// testing the server
app.get("/", function (req, res) {
  res.status(200).json({
    msg: "Ok",
  });
});
//routes
app.use("/user", userRoute);
//listen on the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
