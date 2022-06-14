import { Request, Response } from "express";
import { Op } from "sequelize";
import { Calendar } from "../db/calendar";
import { createMultiEventObject } from "../utils/date.utils";

class CalendarController {
    async getAllEvents(req: Request, res: Response) {
        
        let result = await Calendar.findAll({
            order: [
                ['id', 'ASC'],
            ],
            raw: true
        })
        res.status(200).json(result)
    }

    async getEventById(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findAll({
            where: {
                id: id,
              },
              raw: true
        })
        if(result && result.length) {
            return res.status(200).json(result)
        }
        res.status(404).end()
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

        const resultArr = createMultiEventObject(result, from, to)
        res.status(200).json(resultArr)
    }

    async postEvent(req: Request, res: Response) {
        const data = {
            date: req.body.date,
            time: req.body.time,
            event: req.body.event,
            period: req.body.period,
            exclude: req.body.exclude,
            author: req.body.author
        }
        if(req.body.date&&req.body.time&&req.body.event) {
            const newEvent = await Calendar.create(data)
            return res.status(201).json(newEvent)
        }
        return res.status(400).end()
    }

    async updateEvent(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findOne({
            where: {
                id: id,
              },
        })

        const data = {
            date: req.body.date,
            time: req.body.time,
            event: req.body.event,
            period: req.body.period,
            exclude: req.body.exclude,
            author: req.body.author
        }
        
        if(result) {
            const currentObject = JSON.parse(JSON.stringify(result))
            if(currentObject.exclude && currentObject.exclude !== req.body.exclude) {
                return res.status(400).json({message: 'Only one day can be excluded'})
            }
            await result.update(data) 
            return res.status(201).json(result)
        }
        
        res.status(404).end()
    }

    async deleteEvent(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findOne({
            where: {
                id: id,
              },
        })
        if(result) {
           await result.destroy()
           return res.status(200).json({message: 'Deleted'})
        }
        return res.status(404).json({message: 'No event for delete'})
    }
}

export = new CalendarController()