const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Journal extends Model {}

Journal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "trip",
        key: "id",
      },
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "journal",
  }
);

module.exports = Journal;