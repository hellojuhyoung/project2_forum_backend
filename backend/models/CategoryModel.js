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
    // userid: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    // },
    // postid: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Post",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    // },
  });
  return Categories;
};
