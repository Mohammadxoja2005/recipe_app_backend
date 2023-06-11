const uuid = require("uuid");
const express = require("express");
const router = express.Router();
const path = require("path");
const { recipe } = require("../models");

router.post("/create", async (req, res) => {
    const { name, description, ingredients, cook_time } = req.body;
    const { img } = req.files;

    let filename = uuid.v4() + ".jpg";

    const response = await recipe.create({ img: filename, name, description, ingredients, cook_time })

    img.mv(path.resolve(__dirname, "..", "static", filename));

    res.json(response)

})

module.exports = router;