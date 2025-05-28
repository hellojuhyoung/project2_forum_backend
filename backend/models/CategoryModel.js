// Category entity

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Categories.associate = (db) => {
    Categories.hasMany(db.Posts, {
      foreignKey: {
        name: "categoryid",
        field: "categoryid",
      },
      sourceKey: "id",
      as: "posts",
      onDelete: "cascade",
    });
  };
  return Categories;
};
