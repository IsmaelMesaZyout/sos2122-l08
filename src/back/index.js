
module.exports = (app) => {

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


};