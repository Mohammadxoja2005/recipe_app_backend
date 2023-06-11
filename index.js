const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

db.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log("server started...");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.json("working...")
})
