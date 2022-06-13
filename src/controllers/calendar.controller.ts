import { Request, Response } from "express";
import { Op } from "sequelize";
import { Calendar } from "../db/calendar";
import { Users } from "../db/users";
import { createMultiEventObject } from "../utils/date.utils";


class CalendarController {
    async getAllEvents(req: Request, res: Response) {
        
        let result = await Calendar.findAll({
            include: {
                model: Users,
                attributes: { exclude: ['id'] },
              },
            attributes: { exclude: ['usersid'] },
            order: [
                ['id', 'ASC'],
            ],
            raw: true
        })
        // const result = await db.query("SELECT * FROM calendar JOIN users ON calendar.usersid = users.id", { type: QueryTypes.SELECT });
        res.status(200).json(result)
    }

    async getEventById(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findAll({
            where: {
                id: id,
              },
        })
        res.status(200).json(result)
    }

    async getByPeriod(req: Request, res: Response) {
        const from = req.query.from as string
        const to = req.query.to as string || req.query.from as string

        let result = await Calendar.findAll({
            include: {
                model: Users,
                attributes: { exclude: ['id'] },
              },
            attributes: { exclude: ['usersid'] },
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
        let data = {
            date: req.body.date,
            time: req.body.time,
            event: req.body.event,
            usersid: req.body.usersid,
            period: req.body.period,
            exclude: req.body.exclude
        }
        const newEvent = await Calendar.create(data)

        res.status(201).json(newEvent)
    }

    async updateEvent(req: Request, res: Response) {
        const id = req.params.id
        let result = await Calendar.findOne({
            where: {
                id: id,
              },
        })

        if(result!) {
           await result.update({
                date: req.body.date,
                time: req.body.time,
                event: req.body.event,
                usersid: req.body.usersid,
                period: req.body.period,
                exclude: req.body.exclude
            })
            
        }
        res.status(201).json(result)
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
           return res.status(200).json({message: 'deleted'})
        }
        return res.status(404).json({message: 'no id for delete'})
    }
}

export = new CalendarController()