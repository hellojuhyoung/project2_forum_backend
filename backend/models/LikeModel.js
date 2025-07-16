module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Likes.associate = (db) => {
    Likes.belongsTo(db.Users, {
      foreignKey: "userid",
      onDelete: "cascade",
      hooks: true,
    });
    Likes.belongsTo(db.Posts, {
      foreignKey: "postid",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Likes;
};
