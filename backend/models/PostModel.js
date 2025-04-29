// Post entity

// sequelize define "Posts" must match with the
// migration name of the table as well as the
// mysql workbench table name
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contentImage: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    // categoryid: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Category",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    // },
  });

  // Post.associate = (db) => {
  //   Post.belongsTo(db.User, {
  //     foreignKey: "userid",
  //     targetKey: "id",
  //     onDelete: "CASCADE",
  //   });
  //   Post.belongsTo(db.Category, {
  //     foreignKey: "categoryid",
  //     targetKey: "id",
  //     onDelete: "CASCADE",
  //   });
  // };
  return Posts;
};
