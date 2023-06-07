module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    "board",
    {
      id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      post: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fk_user_id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      tableName: "board",
      timestamps: false,
      charset: "utf8",
    }
  );
  return board;
};
