const { Model, DataTypes } = require("sequelize");

class Collection extends Model {
  static associate(models) {
    Collection.belongsToMany(models.Product, {
      through: models.CollectionItem,
      foreignKey: "collection_id",
      otherKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  Collection.init(
    {
      collection_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      collection_name: DataTypes.STRING(100),
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "collections",
      timestamps: false,
    }
  );

  return Collection;
};