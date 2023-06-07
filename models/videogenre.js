module.exports = (sequelize, DataTypes) => {
  const genre = sequelize.define(
    "genre",
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
      tableName: "videogenre",
      timestamps: false,
      charset: "utf8",
    }
  );
  return genre;
};
