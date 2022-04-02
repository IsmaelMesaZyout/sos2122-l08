const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use("/",express.static("./public"));
app.get("/api/v1/contacts", (req,res)=>{
    res.send([
        {
            name: "pepe",
            phone: 12345
        },
        {
            name: "alfonso",
            phone: 12345
        }
    ]);
});
app.get("/api", (req,res)=>{
    res.send({ result: true });
});

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
