const express = require('express');
var request = require('supertest');
const app = express();
const { MongoClient } = require('mongodb');

describe('insert', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = await MongoClient.connect(`mongodb+srv://h4iadmin:WoodsSociety@cluster0.szxqh.mongodb.net/Users?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
        });
        db = await connection.db(`Users`);
    });
    afterAll(async () => {
        await connection.close();
    });
    it('should insert a doc into collection', async () => {
        const users = db.collection('users');
        const mockUser = {
            "userID": 1,
            "firstName": "Sage",
            "lastName": "Meadows",
            "userName": "noximus",
            "email": "test@gmail.com",
            "password": "1234"
        };
        await request(app).post('/signup').send(mockUser)
        const insertedUser = await users.findOne({ userID: 1 });
        expect(insertedUser.email).toEqual(mockUser.email);
        expect(insertedUser.userName).toEqual(mockUser.userName);
        expect(insertedUser.firstName).toEqual(mockUser.firstName);
        expect(insertedUser.lastName).toEqual(mockUser.lastName);
    });
});