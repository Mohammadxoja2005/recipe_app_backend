const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const recipeRouter = require("./routes/recipe");
const commentRouter = require("./routes/comments");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

// routes
app.use("/recipe", recipeRouter);
app.use("/comment", commentRouter);

db.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || 3002, () => {
            console.log("server started...");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.json("working...")
})
