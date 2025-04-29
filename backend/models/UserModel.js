// User entity

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // postid: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Post",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
    }
  );

  // setup any foreign keys with other tables
  // User.associate = (db) => {
  //   User.hasMany(db.Post, {
  //     foreignKey: "postid",
  //     targetKey: "id",
  //     onDelete: "CASCADE",
  //   });
  // };

  return Users;
};
