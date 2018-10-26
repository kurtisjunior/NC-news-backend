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

    describe('/:articles/id', () => {
        it('returns a status 200 for article by ID', () => {
            return request
                .get(`/api/articles/${articleDocs[0]._id}`)
                .expect(200)
                .then(result => {
                    expect(result.body.title).to.equal(articleDocs[0].title)
                    expect(result.body.body).to.equal(articleDocs[0].body);
                })
        })
        it('returns a 404 if the ID does not exist', () => {
            return request
                .get(`/api/articles/${bad_id}`)
                .expect(404)
                .then((result) => {
                    expect(result.body.msg).to.equal('page not found')
                })
        })
    })
    after(() => {
        mongoose.disconnect()
    })
})
