module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    comment.associate = (models) => {
        comment.belongsTo(models.recipe, {
            onDelete: "cascade",
            foreignKey: "recipe_id"
        })
    }

    return comment;
}
