// User entity - Your UserModel.js should look like this now
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        // type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      loginMethod: {
        type: DataTypes.ENUM("local", "google", "kakao", "naver"),
        allowNull: false,
      },
      usernameUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      passwordToken: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      passwordTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
    }
  );

  Users.associate = (db) => {
    Users.hasMany(db.Posts, {
      foreignKey: "userid",
      sourceKey: "id",
      onDelete: "cascade",
    });
    Users.hasMany(db.Likes, { foreignKey: "userid" });
  };

  return Users;
};
