import express from 'express';
import CalendarController from '../controllers/calendar.controller';

const api = express.Router();

/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: Calendar events API
 */

/**
 * @swagger
 * /api/calendar:
 *   get:
 *     summary: Returns the list with all events
 *     tags: [Calendar]
 *     responses:
 *       200:
 *         description: The list of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Calendar'
 */
api.get('/calendar/', CalendarController.getAllEvents)
/**
 * @swagger
 * /api/calendar/period:
 *   get:
 *     summary: Returns list with events by period
 *     tags: [Calendar]
 *     parameters: 
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           example: 2022-06-20
 *         required: true
 *         description: Start date for select by period.  
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           example: 2022-06-28
 *         required: false
 *         description: Finish date for select by period. If not seted, returns events will be for one day. 
 *     responses:
 *       200:
 *         description: The list of all events by period
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Calendar'
 */
api.get('/calendar/period/', CalendarController.getByPeriod)
/**
 * @swagger
 * /api/calendar/{id}:
 *   get:
 *     summary: Returns one event by id
 *     tags: [Calendar]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: rtue
 *         description: This is the event id 
 *     responses:
 *       200:
 *         description: Event by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       404:
 *         description: Event was not found
 */
api.get('/calendar/:id', CalendarController.getEventById)
/**
 * @swagger
 * /api/calendar:
 *   post:
 *     summary: Create new event
 *     tags: [Calendar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCalendarData'
 *     responses:
 *       201:
 *         description: Event was created successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       400:
 *         description: Wrong data in the body
 */
api.post('/calendar/', CalendarController.postEvent)
/**
 * @swagger
 * /api/calendar/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Calendar]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: rtue
 *         description: This is the event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCalendarData'
 *     responses:
 *       201:
 *         description: Event was update successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       400:
 *         description: Only one day can be excluded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: 'Only one day can be excluded'            
 *       404:
 *         description: Event not found
 */
api.put('/calendar/:id', CalendarController.updateEvent)
/**
 * @swagger
 * /api/calendar/{id}:
 *   delete:
 *     summary: Delete event by id
 *     tags: [Calendar]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: rtue
 *         description: This is the event id
 *     responses:
 *       200:
 *         description: Event was delete successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message
 *                   example: 'deleted'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: 'No event for delete'
 */
api.delete('/calendar/:id', CalendarController.deleteEvent)

export {api}

/**
*@swagger
*components:
*  schemas:
*    Calendar:
*      type: object
*      required:
*        - date
*        - time
*        - event
*      properties:
*        id:
*          type: integer
*          description: Auto-generated Event id
*        date:
*          type: string
*          description: Date of evnt
*        time:
*          type: string
*          description: Time of event
*        event:
*          type: string
*          description: Event title
*        period:
*          type: string
*          description: Flags for repeatable events
*        exclude:
*          type: string
*          description: This event date will be exclude from repeat cycle
*        author:
*          type: string
*          description: Author of event
*      example:
*        id: 1
*        date: '2022-06-14'
*        time: '11:00:00'
*        event: 'Event name'
*        period: null | 'day' | 'week' | 'two-weeks' | 'month'
*        exclude: null | '2022-06-21'
*        author: 'Yura'
*    PostCalendarData:
*      type: object
*      required:
*        - date
*        - time
*        - event
*      properties:
*        date:
*          type: string
*          description: Date of evnt
*        time:
*          type: string
*          description: Time of event
*        event:
*          type: string
*          description: Event title
*        period:
*          type: string
*          description: Flags for repeatable events
*        exclude:
*          type: string
*          description: This event date will be exclude from repeat cycle
*        author:
*          type: string
*          description: Author of event
*      example:
*        date: '2022-06-14'
*        time: '11:00:00'
*        event: 'Event name'
*        period: 'day'
*        exclude: '2022-06-21'
*        author: 'Yura'
*/
