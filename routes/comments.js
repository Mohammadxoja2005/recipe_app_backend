const express = require("express");
const router = express.Router();
const { comment } = require('../models')

router.post('/create/:id', async (req, res) => {
    const { id } = req.params;
    const { commentToRecipe } = req.body;

    const response = await comment.create({ comment: commentToRecipe, recipe_id: id })

    res.json(response);
})

module.exports = router;