module.exports = (sequelize, DataTypes) => {
    const recipe = sequelize.define('recipe', {
        img: {
            type: DataTypes.STRING(100000),
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },

        cook_time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    recipe.associate = (models) => {
        recipe.hasMany(models.comment, {
            onDelete: "cascade",
            foreignKey: "recipe_id",
        })
    }

    return recipe;
}
