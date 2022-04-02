const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use("/",express.static("./public"));

const backend = require("./src/back");
backend(app);

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
