const { Model, DataTypes } = require("sequelize");

class CollectionItem extends Model {}

module.exports = (sequelize) => {
  CollectionItem.init(
    {
      collection_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "collection_items",
      timestamps: false,
    }
  );

  return CollectionItem;
};