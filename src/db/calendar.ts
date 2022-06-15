import { DataTypes, ModelDefined, Optional } from "sequelize";
import { db } from "../config/db-config";
import { ICalendarAtributes } from "../Interface/api.interface";

type CalendarCreationAttributes = Optional<ICalendarAtributes, 'id' | 'period' | 'exclude'>;
  
export const Calendar: ModelDefined<ICalendarAtributes, CalendarCreationAttributes> = db.define('calendar', {
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