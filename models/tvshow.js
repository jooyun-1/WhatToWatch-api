module.exports = (sequelize, DataTypes) => {
  const tvShow = sequelize.define(
    "movie",
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
      genres: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      poster_img: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      popularity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      provider_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      backdrop_path: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      overview: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      first_air_date: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      vote_average: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      // maxpage: {
      //   type: DataTypes.INTEGER(100),
      //   allowNull: false,
      // },
    },
    {
      tableName: "tvshow",
      timestamps: false,
      charset: "utf8",
    }
  );
  return tvShow;
};
