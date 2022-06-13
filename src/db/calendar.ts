import { DataTypes, ModelDefined, Optional } from "sequelize";
import { db } from "../config/db-config";
import { Users } from "./users";

export type CalendarAtributes = {
    id: number
    date: string | Date
    time: string
    event: string
    usersid: number
    period: 'day' | 'week' | 'two-week' | 'month' | null
    exclude: string | Date | null
}

type CalendarCreationAttributes = Optional<CalendarAtributes, 'id' | 'period' | 'exclude'>;
  
const Calendar: ModelDefined<CalendarAtributes, CalendarCreationAttributes> = db.define('calendar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    event: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    usersid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    period:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    exclude:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    }
  },{
    timestamps: false,
    tableName: 'calendar'
  })

  Calendar.belongsTo(Users, { foreignKey: 'usersid' });

export {Calendar}