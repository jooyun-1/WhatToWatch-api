module.exports = (sequelize, DataTypes) => {
  const ott = sequelize.define(
    "ott",
    {
      id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      logo_path: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      provider_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      provider_id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
    },
    {
      tableName: "ott",
      timestamps: false,
      charset: "utf8",
    }
  );
  return ott;
};
