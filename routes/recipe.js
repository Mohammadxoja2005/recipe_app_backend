const uuid = require("uuid");
const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const sharp = require('sharp');
const path = require("path");
const { recipe, comment } = require("../models");

router.get("/sort/:sort_order", async (req, res) => {
    const getAllRecipes = await recipe.findAll();
    const { sort_order } = req.params;

    switch (sort_order) {
        case "increase": res.json(getAllRecipes); break;
        case "decrease": res.json(getAllRecipes.reverse()); break;
    }

    // res.json(getAllRecipes);
});

router.get("/search", async (req, res) => {
    const { q, order } = req.query;

    let whereClause = {};

    // if (q == 'all') {
    //     const recipes = await recipe.findAll();

    //     switch (order) {
    //         case "increase": res.json(recipes); break;
    //         case "decrease": res.json(recipes.reverse()); break;
    //     }

    //     return;
    // }

    if (q) {
        whereClause = {
            name: {
                [Op.like]: `%${q}%`,
            },
        };
    }

    try {
        const recipes = await recipe.findAll({
            where: whereClause,
        });

        switch (order) {
            case "increase": res.json(recipes); break;
            case "decrease": res.json(recipes.reverse()); break;
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const getOneRecipe = await recipe.findAll({
        where: { id: id },
        include: comment
    });

    getOneRecipe.forEach((recipe) => {
        recipe.ingredients = recipe.ingredients.split(',').map((ingredient) => ingredient.trim())
    })

    res.json(getOneRecipe);
});

router.put("/edit/:id", async (req, res) => {
    const { name, description, ingredients, cook_time, img } = req.body;
    const { id } = req.params;

    // let filename = uuid.v4() + ".jpg";

    // img.mv(path.resolve(__dirname, "..", "static", filename));
    const response = await recipe.update(
        { img: img, name, description, ingredients, cook_time },
        { where: { id: id } }
    )

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

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    console.log(id);

    const response = await recipe.destroy({ where: { id: id } })

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