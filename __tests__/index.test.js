const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index.js')
const endpointFile = require('../endpoints.json')

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



describe('GET /api', () => {
    test('should return the full JSON when the endpoint is called', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((endpoint) => {
        expect(endpoint.body).toEqual(endpointFile)}
        )  
    });  
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
    test('GET 200, each topic object should have 2 keys, slug & description', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body: {topics}}) =>{
            expect(Object.keys(topics[0])).toEqual([ 'slug', 'description' ])}
        )
    });
});