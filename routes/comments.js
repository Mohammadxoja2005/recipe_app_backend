const express = require("express");
const router = express.Router();
const { comment } = require('../models')

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await comment.findAll({ where: { recipe_id: id } })
    
    res.json(response);
})

router.post('/create/:id', async (req, res) => {
    const { id } = req.params;
    const { commentToRecipe } = req.body;

    const response = await comment.create({ comment: commentToRecipe, recipe_id: id })

    res.json(response);
})

module.exports = router;