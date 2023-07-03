module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      genres: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      tvgenres: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      videogenres: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "user",
      timestamps: false,
      charset: "utf8",
    }
  );
  return user;
};
