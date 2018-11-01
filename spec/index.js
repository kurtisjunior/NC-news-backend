process.env.NODE_ENV = "test"

const { expect } = require('chai');
const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')(app);
const seedDB = require('../seed/seed')

const { database } = require('../config')
const { articles, comments, topics, users } = require(database)


describe('/api', () => {
    let topicDocs, userDocs, articleDocs, commentDocs, bad_id = mongoose.Types.ObjectId();
    beforeEach(() => {
        return seedDB(articles, comments, topics, users)
            .then((allDocs) => {
                articleDocs = allDocs[0]
                commentDocs = allDocs[1];
                topicDocs = allDocs[2];
                userDocs = allDocs[3];
            })
    })

    describe('/', () => {
        it('returns a status 200 for the api path page', () => {
            return request
                .get('/api')
                .expect(200)
        })
    })

    describe('PATHS /topics', () => {
        it('returns a status 200 and all topics', () => {
            return request
                .get('/api/topics')
                .expect(200)
                .then(result => {
                    expect(result.body[0].title).to.equal(topicDocs[0].title)
                })
        })
    })
    describe('GET /api/topics/:topic_slug/articles', () => {
        it('returns a status 200 and all articles for a certain topic', () => {
            return request
                .get(`/api/topics/${articleDocs[0].belongs_to}/articles`)
                .expect(200)
                .then(result => {
                    expect(result.body[0].belongs_to).to.equal(articleDocs[0].belongs_to)
                })
        })
        it('returns a status 404 for an invalid topic', () => {
            return request
                .get(`/api/topics/tennis/articles`)
                .expect(404)
                .then(result => {
                    expect(result.body.msg).to.equal('page not found')
                })

        })
    })

    describe('POST /api/topics/:topic_slug/articles', () => {
        it('returns a status 201 and adds a new article', () => {
            const mezut = ({
                votes: '10',
                created_at: "2018-04-16T19:29:32.774Z",
                title: "Mezut Ozil",
                created_by: "5bd3237c1e6558f70b448de4",
                body: "11 wins on the bounce.",
                belongs_to: "football"
            })
            return request
                .post('/api/topics/football/articles')
                .send(mezut)
                .expect(201)
                .then(result => {
                    expect(result.body.title).to.equal(mezut.title)
                })
        })
    })
    describe('GET /api/articles', () => {
        it('returns a status 200 and all of the articles', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then((result) => {
                    expect(result.body[0].title).to.equal(articleDocs[0].title)
                })
        })
    })

    describe('GET /:articles/id', () => {
        it('returns a status 200 for article by ID', () => {
            return request
                .get(`/api/articles/${articleDocs[0]._id}`)
                .expect(200)
                .then(result => {
                    expect(result.body.title).to.equal(articleDocs[0].title)
                    expect(result.body.body).to.equal(articleDocs[0].body);
                })
        })
        it('GET returns a 404 if the ID does not exist', () => {
            return request
                .get(`/api/articles/${bad_id}`)
                .expect(404)
                .then((result) => {
                    expect(result.body.msg).to.equal('page not found')
                })
        })
    })

    describe('GET /api/articles/:article_id/comments', () => {
        it('returns a status 200 and the comments for a single article', () => {
            return request
                .get(`/api/articles/${articleDocs[0]._id}/comments`)
                .expect(200)
                .then((result) => {
                    expect(result.body[0].votes).to.equal(commentDocs[0].votes)
                    expect(result.body[0].body).to.equal(commentDocs[0].body)
                })
        })
    })

    describe('POST /api/articles/:article_id/comments', () => {
        it('returns a status 201 and posts a new comment', () => {
            const test = ({
                votes: "7",
                created_at: "2017-07-26T06:42:10.835Z",
                body: "test body",
                belongs_to: "5bd3237c1e6558f70b448df2",
                created_by: "5bd3237c1e6558f70b448de2"
            })
            return request
                .post(`/api/articles/${articleDocs[0]._id}/comments`)
                .send(test)
                .expect(201)
                .then(result => {
                    expect(result.body.body).to.equal(test.body)
                })
        })
    })

    describe('PATCH /api/articles/:article_id', () => {
        it('returns a status 200 and updates an article vote count', () => {
            const vote = articleDocs[0].votes
            return request
                .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
                .expect(200)
                .then((result) => {
                    expect(result.body.votes).to.equal(vote + 1);
                })
        })
    })
    describe('PATCH /api/articles/:comment_id', () => {
        it('returns a status 200 and updates a comment vote count', () => {
            const vote = commentDocs[0].votes
            return request
                .patch(`/api/comments/${commentDocs[0]._id}?vote=down`)
                .expect(200)
                .then((result) => {
                    expect(result.body.votes).to.equal(vote - 1);
                })
        })
    })
    describe('DELETE /api/comments/:comment_id', () => {
        it('returns a status 200 and deletes an individual comment', () => {
            return request
                .delete(`/api/comments/${commentDocs[0]._id}`)
                .expect(200)
                .then((result) => {
                    expect(result.body.body).to.equal(commentDocs[0].body)
                })
        })
    })
    describe('GET users by username', () => {
        it('returns a status 200 and correct user by username', () => {
            return request
                .get(`/api/users/${userDocs[0].username}`)
                .expect(200)
                .then((result) => {
                    expect(result.body[0].username).to.equal(userDocs[0].username)
                })
        })
    })
    after(() => {
        mongoose.disconnect()
    })
})



/*
TODO: 

One failing test for each path
counter 
populate created comment belongs to
ReadMe 

*/