const uuid = require("uuid");
const express = require("express");
const router = express.Router();
const path = require("path");
const { recipe } = require("../models");

router.get("/", async (req, res) => {
    const getAllRecipes = await recipe.findAll();

    res.json(getAllRecipes);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const getOneRecipe = await recipe.findAll({ where: { id: id } });

    res.json(getOneRecipe);
});


router.post("/create", async (req, res) => {
    const { name, description, ingredients, cook_time } = req.body;
    const { img } = req.files;

    let filename = uuid.v4() + ".jpg";

    const response = await recipe.create({ img: filename, name, description, ingredients, cook_time })

    img.mv(path.resolve(__dirname, "..", "static", filename));

    res.json(response)

})

module.exports = router;