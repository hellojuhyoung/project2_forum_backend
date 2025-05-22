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
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "cascade",
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
      onDelete: "cascade",
      field: "categoryid",
    },
  });

  Posts.associate = (db) => {
    Posts.belongsTo(db.Users, {
      foreignKey: "userid",
      targetKey: "id",
      onDelete: "cascade",
    });
    Posts.belongsTo(db.Categories, {
      foreignKey: {
        name: "categoryid",
        field: "categoryid",
      },
      targetKey: "id",
      as: "category",
      onDelete: "cascade",
    });
    Posts.hasMany(db.PostImages, {
      foreignKey: "postid",
      as: "images",
      onDelete: "cascade",
    });
  };
  return Posts;
};
