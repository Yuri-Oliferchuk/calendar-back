import { DataTypes, ModelDefined, Optional } from "sequelize";
import { db } from "../config/db-config";

export type CalendarAtributes = {
    id: number
    date: string | Date
    time: string
    event: string
    period: 'day' | 'week' | 'two-week' | 'month' | null
    exclude: string | Date | null
    author: string | null
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
    period:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    exclude:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
    },
    author:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
  },{
    timestamps: false,
    tableName: 'calendar'
  })

export {Calendar}