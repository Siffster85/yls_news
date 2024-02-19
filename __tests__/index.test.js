const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index.js')

beforeEach(() =>  seed(data))

afterAll(() =>  db.end())

describe('catchAllError', () => {
    test('If the endpoint is incorrect, return 404', () => {
        return request(app)
        .get('/api/twopics')
        .expect(404)
        .then(({ body: {msg} }) => {
        expect(msg).toBe('Path not found');
    });
    })
});

describe('GET /api/topics', () => {
    test('GET 200, should return a table of 3 topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body: {topics}}) =>{
            expect(topics.length).toBe(3)}
        )
    });
});