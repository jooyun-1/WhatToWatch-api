module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    "movies",
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
      backdrop_path: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      overview: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      vote_average: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      release_date: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
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
      // maxpage: {
      //   type: DataTypes.INTEGER(100),
      //   allowNull: false,
      // },
    },
    {
      tableName: "movies",
      timestamps: false,
      charset: "utf8",
    }
  );
  return movie;
};
