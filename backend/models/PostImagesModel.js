// Post Image entity

module.exports = (sequelize, DataTypes) => {
  const PostImages = sequelize.define("PostImages", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Posts",
        key: "id",
      },
      onDelete: "cascade",
    },
  });

  PostImages.associate = (db) => {
    PostImages.belongsTo(db.Posts, {
      foreignKey: "postid",
      targetKey: "id",
      onDelete: "cascade",
    });
  };
  return PostImages;
};
