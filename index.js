const express = require("express");
const bodyParser = require("body-parser");
const backend = require("./src/back");

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
backend(app);


app.use("/",express.static("./public"));

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
