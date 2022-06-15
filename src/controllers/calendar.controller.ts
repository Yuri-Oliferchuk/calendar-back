import { Request, Response } from "express";
import { Op } from "sequelize";
import { Calendar } from "../db/calendar";
import { ICalendarAtributes } from "../Interface/api.interface";
import { createMultiEventObject } from "../utils/date.utils";

class CalendarController {
    async getAllEvents(req: Request, res: Response) {    
        let result = await Calendar.findAll({
            order: [['id', 'ASC']],
            raw: true
        })
        res.status(200).json({
            data: result, 
            message: "All events getted",
            code: 0
        })
    }

    async getEventById(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findAll({
            where: { id },
            raw: true
        })
        if(result && result.length) {
            return res.status(200).json({
                data: result, 
                message: "Event getted",
                code: 0
            })
        }
        res.status(404).json({
            message: `No event with id:${id}`,
            code: 1
        })
    }

    async getByPeriod(req: Request, res: Response) {
        const from = req.query.from as string
        const to = req.query.to as string || req.query.from as string

        let result = await Calendar.findAll({
            where: {
                [Op.or]:[
                    {date: {
                        [Op.gte]: from,
                        [Op.lte]: to
                    }},
                    {period: {
                        [Op.ne]: null
                    }}
                ]},
            raw: true,
        }) as any

        res.status(200).json({
            data: createMultiEventObject(result, from, to),
            message: "All events by period getted",
            code: 0
        })
    }

    async postEvent(req: Request, res: Response) {
        const result = []
        const data: ICalendarAtributes = {
            date: req.body.date,
            time: req.body.time,
            event: req.body.event,
            period: req.body.period,
            exclude: req.body.exclude,
            author: req.body.author
        }
        if(req.body.date&&req.body.time&&req.body.event) {
            result.push(await Calendar.create(data))
            return res.status(201).json({
                data: result,
                message: "Event was created",
                code: 0
            })
        }
        return res.status(400).json({
            message: 'Something wrong',
            code: 1
        })
    }

    async updateEvent(req: Request, res: Response) {
        const id = req.params.id
        const resultArray = []
        let result = await Calendar.findOne({
            where: { id },
        })

        const data: ICalendarAtributes = {
            date: req.body.date,
            time: req.body.time,
            event: req.body.event,
            period: req.body.period,
            exclude: req.body.exclude,
            author: req.body.author
        }
        
        if(result) {
            const currentObject: ICalendarAtributes = JSON.parse(JSON.stringify(result))
            if(currentObject.exclude && currentObject.exclude !== req.body.exclude) {
                return res.status(400).json({
                    message: 'Only one day can be excluded',
                    code: 1
                })
            }
            resultArray.push(await result.update(data)) 
            return res.status(201).json({
                data: resultArray,
                message: "Event was updated",
                code: 0
            })
        }
        
        res.status(404).json({
            message: 'Event not found',
            code: 1
        })
    }

    async deleteEvent(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findOne({
            where: { id },
        })
        if(result) {
            await result.destroy()
            return res.status(200).json({
                message: 'Deleted',
                code: 0
            })
        }
        return res.status(404).json({
            message: 'Event not found',
            code: 1
        })
    }
}

export = new CalendarController()