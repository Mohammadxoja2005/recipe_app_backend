const uuid = require("uuid");
const express = require("express");
const router = express.Router();
const sharp = require('sharp');
const path = require("path");
const { recipe, comment } = require("../models");

router.get("/", async (req, res) => {
    const getAllRecipes = await recipe.findAll();

    res.json(getAllRecipes);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const getOneRecipe = await recipe.findAll({
        where: { id: id },
        include: comment
    }
    );

    res.json(getOneRecipe);
});

router.put("/edit/:id", async (req, res) => {
    const { name, description, ingredients, cook_time } = req.body;
    const { img } = req.files;
    const { id } = req.params;

    let filename = uuid.v4() + ".jpg";

    const response = await recipe.update(
        { img: filename, name, description, ingredients, cook_time },
        { where: { id: id } }
    )

    img.mv(path.resolve(__dirname, "..", "static", filename));

    res.json(response)
})


router.post("/create", async (req, res) => {
    const { name, description, ingredients, cook_time, img } = req.body;
    // const { img } = req.files;

    // let filename = uuid.v4() + ".jpg";

    // img.mv(path.resolve(__dirname, "..", "static", filename)); 

    const response = await recipe.create({ img, name, description, ingredients, cook_time })

    res.json(response)
})


// router.post('/create', async (req, res) => {
//     const { name, description, ingredients, cook_time } = req.body;
//     const { img } = req.files;

//     try {
//         const filename = uuid.v4() + '.jpg';
//         const uploadPath = path.resolve(__dirname, '..', 'static', filename);
//         const resizedPath = path.resolve(__dirname, '..', 'static', 'resized', filename);

//         // Move the uploaded image to a temporary location
//         await img.mv(uploadPath);

//         // Shrink the image file size using sharp
//         await sharp(uploadPath)
//             .resize(800, 600)
//             .toFile(resizedPath);

//         // Create the recipe in the database with the resized image file name
//         const response = await recipe.create({
//             img: filename,
//             name,
//             description,
//             ingredients,
//             cook_time,
//         });

//         res.json(response);
//     } catch (error) {
//         console.error('Error creating recipe:', error);
//         res.status(500).json({ error: 'Failed to create recipe.' });
//     }
// });

module.exports = router;