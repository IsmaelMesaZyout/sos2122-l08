const express = require("express");
const bodyParser = require("body-parser");
const backend = require("./src/back");
const cors = require("cors");

var request = require("request");

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

backend(app);

var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-imz.herokuapp.com/#/contactList';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


app.use("/",express.static("./public"));

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
