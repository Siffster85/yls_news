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
    test('GET 200 return the full JSON when the endpoint is called', () => {
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
            expect(topics.length).toBe(3)
            topics.forEach((topic) =>{
            expect(Object.keys(topic)).toEqual([ 'slug', 'description' ])
            })
    })
    });
});

describe('GET /api/articles/:article_id', () => {
    test('GET 200, return the full article with all elements', () => {
        return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual({
                article_id: 4,
                title: 'Student SUES Mitch!',
                topic: 'mitch',
                author: 'rogersop',
                body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                created_at: '2020-05-06T01:14:00.000Z',
                votes: 0,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              })
        })
        
    });
    test('GET 400, if the request is not a number, should return a bad request', () => {
        return request(app)
        .get('/api/articles/for')
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Bad Request!')
        })
        
    });
    test('GET 404, if the article ID number does not exist', () => {
        return request(app)
        .get('/api/articles/1234567')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Article not found.')
    });
    })
});

describe('GET /api/articles', () => {
    test('GET 200, should return with all the articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.length).toBe(13)
        })
    })
    test('GET 200, should return all the articles and each one should have all 8 required properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            body.forEach((article) => {
                expect(Object.keys(article)).toEqual(['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'article_img_url', 'comment_count'])
            })
        })
    });
    test('GET 200, should be in descending order based on the created at column ', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeSortedBy('created_at', {descending : true})
        })
    });
    test('GET 404, if an incorrect endpoint is requested, return a 404', () => {
        return request(app)
        .get('/api/articlessss')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Path not found')
    });
    });
});