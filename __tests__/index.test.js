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
            expect(topic).toEqual(expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String)
            }))
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
            expect(body).toEqual(expect.objectContaining({
                article_id: 4,
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
         )
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
    test('GET 200, return the full article including the new comment count feature', () => {
        return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(expect.objectContaining({
                article_id: 4,
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: 0,
            })
         )
        })
    });
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
                expect(article).toEqual(expect.objectContaining({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number),
                }))
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
    test('GET 200, should return with all the articles with a specific topic', () => {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({body}) => {
            expect(body.length).toEqual(1)
            body.forEach((article) => {
            expect(article.topic).toBe('cats')
            })
        })
    })
    test('GET 200, should return message if that topic is not present', () => {
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(({body: {msg}}) => {
            expect(msg).toBe('No articles with this topic')
        })
    })
    test('GET 404, should reject if the topic is not valid', () => {
        return request(app)
        .get('/api/articles?topic=dogsandbears')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Topic not found')
        })
    });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('GET 200, Should return all the comments from an article with the 6 request properties', () => {
        return request(app)
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({body}) => {
            expect(body[1].length).toBe(2)
            body[1].forEach((comment) => {
                expect(comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String)
                }))                
            })
        })
    });
    test('GET 200, should be in most recent first order based on the created at column ', () => {
        return request(app)
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({body}) => {
            expect(body[1]).toBeSortedBy('created_at', {descending : true})
        })
    });
    test('GET 200, should return an empty array when there are no comments', () => {
        return request(app)
        .get('/api/articles/7/comments')
        .expect(200)
        .then(({body}) => {
            expect(body[1]).toEqual([])
        })
    });
    test('GET 400, if the request is not a number, should return a bad request', () => {
        return request(app)
        .get('/api/articles/for/comments')
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Bad Request!')
        })
    });
    test('GET 404, if the article ID number does not exist', () => {
        return request(app)
        .get('/api/articles/1234567/comments')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Article not found.')
    });
    })
});

describe('POST /api/articles/:article_id/comments', () => {
    test('POST 201, should add a comment to an article that is then available to read when when returning the comments from the article, with comment ID, created timestamp and default votes number.', () => {
        const newComment = {
            username: "lurker",
            body: "This is my test post, there are many like it but this one is mine"
        }
        return request(app)
        .post('/api/articles/7/comments')
        .expect(201)
        .send(newComment)
        .then(({body}) => {
            expect(body[1]).toMatchObject({
                article_id: 7,
                author: "lurker",
                body: "This is my test post, there are many like it but this one is mine",
                comment_id: expect.any(Number),
                votes: 0,
                created_at: expect.any(String)
            })
        }) 
    });
    test('POST 400, if a bad body is sent', () => {
        const newComment = {}
        return request(app)
        .post('/api/articles/7/comments')
        .expect(400)
        .send(newComment)
        .then(({body: {msg}}) => {
            expect(msg).toBe("Bad Request!")
        }) 
    });
    test('POST 404, if the article does not exist, reject', () => {
        const newComment = {
            username: "lurker",
            body: "This is my test post, there are many like it but this one is mine"
        }
        return request(app)
        .post('/api/articles/1234567/comments')
        .expect(404)
        .send(newComment)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Article not found.')
        
    })
    })    
    test('POST 404, if the user does not exist, reject', () => {
        const newComment = {
            username: "imaginaryuser",
            body: "This is my test post, there are many like it but this one is mine"
        }
        return request(app)
        .post('/api/articles/7/comments')
        .expect(404)
        .send(newComment)
        .then(({body: {msg}}) => {
            expect(msg).toBe('User not found.')
        
    })
    })    
})

describe('PATCH /api/articles/:article_id', () => {
    test('PATCH 200, should update an article vote count and return the article', () => {
        const vote = {inc_votes: 1}
        return request(app)
        .patch('/api/articles/4')
        .expect(200)
        .send(vote)
        .then(({body}) => {
            expect(body[1]).toEqual({
                article_id: 4,
                title: 'Student SUES Mitch!',
                topic: 'mitch',
                author: 'rogersop',
                body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                created_at: '2020-05-06T01:14:00.000Z',
                votes: 1,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              })
        })
    });
    test('PATCH 200, should update an article vote count and return the article, checking if a negative is used it works as expected', () => {
        const vote = {inc_votes: -1}
        return request(app)
        .patch('/api/articles/4')
        .expect(200)
        .send(vote)
        .then(({body}) => {
            expect(body[1]).toEqual({
                article_id: 4,
                title: 'Student SUES Mitch!',
                topic: 'mitch',
                author: 'rogersop',
                body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                created_at: '2020-05-06T01:14:00.000Z',
                votes: -1,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
              })
        })
    });
    test('GET 400, if the request is not a number, should return a bad request', () => {
        const vote = {inc_votes: 1}
        return request(app)
        .patch('/api/articles/for')
        .expect(400)
        .send(vote)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Bad Request!')
        })
    });
    test('GET 404, if the article ID number does not exist', () => {
        const vote = {inc_votes: 1}
        return request(app)
        .patch('/api/articles/1234567')
        .expect(404)
        .send(vote)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Article not found.')
    });
    })
})

describe('DELETE /api/comments/:comment_id', () => {
    test('DELETE 204 Should return 204 and no content', () => {
        return request(app)
        .delete('/api/comments/18')
        .expect(204)
    });
    test('DELETE 400, if comment not found reject', () => {
        return request(app)
        .delete('/api/comments/18901')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Comment not found')
        })
    });
    test('DELETE 400, if incorrect data type sent should reject ', () => {
        return request(app)
        .delete('/api/comments/allofmine')
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Bad Request!')
        })
    });
})

describe('GET /api/users', () => {
    test('GET 200, should return a table of 4 users and each should have 3 keys, username, name and avatar_url', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) =>{
            expect(body.length).toBe(4)
            body.forEach((user) =>{
            expect(user).toEqual(expect.objectContaining({
                username: expect.any(String), 
                name: expect.any(String),
                avatar_url: expect.any(String)
            }))
        })
    })
    });
});