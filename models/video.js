module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define(
    "video",
    {
      id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      genre_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      thumbnails: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      tableName: "video",
      timestamps: false,
      charset: "utf8",
    }
  );
  return video;
};
