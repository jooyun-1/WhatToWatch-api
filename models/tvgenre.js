module.exports = (sequelize, DataTypes) => {
  const tvgenre = sequelize.define(
    "tvgenre",
    {
      id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      genre_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "tvgenre",
      timestamps: false,
      charset: "utf8",
    }
  );
  return tvgenre;
};
