import request from 'supertest'
import { api } from '../api/api';

import express from "express";
import bodyParser from 'body-parser'; 
import { afterAll, describe, expect, it } from "@jest/globals";
import { db } from '../config/db-config';
import { Users } from '../db/users';
import { Calendar } from "../db/calendar";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);


describe('API testing', () => {
    afterAll(() => { db.close() })
    describe('GET /api/calendar/', () => {
        it('should return status 200', async () => {
            const response = await request(app).get('/api/calendar/');
            expect(response.statusCode).toEqual(200)
        })
        it('should have right object in response', async () => {
            const response = await request(app).get('/api/calendar');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('date')
            expect(response.body[0]).toHaveProperty('time')
            expect(response.body[0]).toHaveProperty('event')
            expect(response.body[0]).toHaveProperty('period')
            expect(response.body[0]).toHaveProperty('exclude')
            expect(response.body[0]).toHaveProperty(['user.username'])
        })
        it('should call DB one time', async () => {
            jest.spyOn(Calendar, 'findAll')
            await request(app).get('/api/calendar');
            expect(Calendar.findAll).toHaveBeenCalledTimes(1);
        })
    })
    describe('GET /api/calendar/:id', () => {
        it('should return status 200', async () => {
            const response = await request(app).get('/api/calendar/1');
            expect(response.statusCode).toEqual(200)
        })
        it('should return status 404', async () => {
            const response = await request(app).get('/api/calendar/1111');
            expect(response.statusCode).toEqual(404)
        })
        it('should have right object in response', async () => {
            const response = await request(app).get('/api/calendar/1');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('date')
            expect(response.body[0]).toHaveProperty('time')
            expect(response.body[0]).toHaveProperty('event')
            expect(response.body[0]).toHaveProperty('period')
            expect(response.body[0]).toHaveProperty('exclude')
        })
        it('should call DB one time', async () => {
            jest.spyOn(Calendar, 'findAll')
            await request(app).get('/api/calendar/1');
            expect(Calendar.findAll).toHaveBeenCalledTimes(1);
        })
    })
    describe('GET /calendar/period/', () => {
        const from = '2022-06-23'
        const to = '2022-06-24'
        it('should return status 200 for period', async () => {
            const response = await request(app).get(`/api/calendar/period?from=${from}&to=${to}`);
            expect(response.statusCode).toEqual(200)
        })
        it('should return status 200 for one day', async () => {
            const response = await request(app).get(`/api/calendar/period?from=${from}`);
            expect(response.statusCode).toEqual(200)
        })
        it('should return status 200 with empty array', async () => {
            const emptyDate = '2020-06-23'
            const response = await request(app).get(`/api/calendar/period?from=${emptyDate}`);
            expect(response.statusCode).toEqual(200)
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBe(0)
        })
        it('should have right object in response', async () => {
            const response = await request(app).get(`/api/calendar/period?from=${from}`);
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('date')
            expect(response.body[0]).toHaveProperty('time')
            expect(response.body[0]).toHaveProperty('event')
            expect(response.body[0]).toHaveProperty('period')
            expect(response.body[0]).toHaveProperty('exclude')
            expect(response.body[0]).toHaveProperty(['user.username'])
        })
        it('should call DB one time', async () => {
            jest.spyOn(Calendar, 'findAll')
            await request(app).get('/api/calendar/1');
            expect(Calendar.findAll).toHaveBeenCalledTimes(1);
        })
    })
    describe('POST /calendar/', () => {
        it('should return status 201 and delete event', async () => {
            const sendObject = {
                    date: "2022-01-01",
                    time: "11:00:00",
                    event: "Event",
                    usersid: 1,
                    period: "day",
                    exclude: null
            }
            const response = await request(app).post('/api/calendar/').send(sendObject)
            const delResponse = await request(app).delete(`/api/calendar/${response.body.id}`)
            expect(response.statusCode).toEqual(201)
            expect(delResponse.statusCode).toEqual(200)
        })
        it('should return status 400 if information not full', async () => {
            const sendObject = {
                    date: "2022-01-01",
            }
            const response = await request(app).post('/api/calendar/').send(sendObject)
            expect(response.statusCode).toEqual(400)
        })
        it('should have right object in response and delete event', async () => {
            const sendObject = {
                date: "2022-01-01",
                time: "11:00:00",
                event: "Event",
                usersid: 1,
                period: "day",
                exclude: null
            }
            const response = await request(app).post('/api/calendar/').send(sendObject)
            const delResponse = await request(app).delete(`/api/calendar/${response.body.id}`)
            expect(response.statusCode).toEqual(201)
            expect(delResponse.statusCode).toEqual(200)
            expect(typeof response.body).toBe('object')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('date')
            expect(response.body).toHaveProperty('time')
            expect(response.body).toHaveProperty('event')
            expect(response.body).toHaveProperty('period')
            expect(response.body).toHaveProperty('exclude')
        })
    })
    describe('PUT /calendar/:id', () => {
        it('should return status 201', async () => {
            const response = await request(app).get('/api/calendar/1')
            const putResponse = await request(app).put(`/api/calendar/${response.body[0].id}`).send({...response.body[0]})
            expect(putResponse.statusCode).toEqual(201)
        })
        it('should return status 404 if no event', async () => {
            const sendObject = {}
            const response = await request(app).put('/api/calendar/11111').send(sendObject)
            expect(response.statusCode).toEqual(404)
        })
        it('should have right object in response', async () => {
            const response = await request(app).get('/api/calendar/1')
            const putResponse = await request(app).put(`/api/calendar/${response.body[0].id}`).send({...response.body[0]})
            expect(putResponse.statusCode).toEqual(201)
            expect(typeof putResponse.body).toBe('object')
            expect(putResponse.body).toHaveProperty('id')
            expect(putResponse.body).toHaveProperty('date')
            expect(putResponse.body).toHaveProperty('time')
            expect(putResponse.body).toHaveProperty('event')
            expect(putResponse.body).toHaveProperty('period')
            expect(putResponse.body).toHaveProperty('exclude')
        })
    })
    describe('DELETE /calendar/:id', () => {
        it('should return status 200', async () => {
            const sendObject = {
                    date: "2022-01-01",
                    time: "11:00:00",
                    event: "Event",
                    usersid: 1,
                    period: "day",
                    exclude: null
            }
            const response = await request(app).post('/api/calendar/').send(sendObject)
            const delResponse = await request(app).delete(`/api/calendar/${response.body.id}`)
            expect(delResponse.statusCode).toEqual(200)
            expect(delResponse.statusCode).toEqual(200)
        })
        it('should return status 404 if no event', async () => {
            const sendObject = {}
            const response = await request(app).delete('/api/calendar/11111').send(sendObject)
            expect(response.statusCode).toEqual(404)
        })
    })
})
