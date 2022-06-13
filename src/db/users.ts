import { DataTypes, ModelDefined, Optional } from "sequelize";
import { db } from "../config/db-config";

export type UsersAtributes = {
  id?: number
  username: string
  email: string
}

type UsersCreationAttributes = Optional<UsersAtributes, 'id'>;

const Users: ModelDefined<UsersAtributes, UsersCreationAttributes> = db.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps: false,
    tableName: 'users'
  })

export {Users}