import express from 'express';
import CalendarController from '../controllers/calendar.controller';

const api = express.Router();

api.get('/calendar/', CalendarController.getAllEvents)
api.get('/calendar/period/', CalendarController.getByPeriod)
api.get('/calendar/:id', CalendarController.getEventById)
api.post('/calendar/', CalendarController.postEvent)
api.put('/calendar/:id', CalendarController.updateEvent)
api.delete('/calendar/:id', CalendarController.deleteEvent)

export {api}