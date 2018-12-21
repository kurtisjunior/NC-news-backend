# NorthCoders News Dashboard

This project serves a RESTful api backend for a news aggregator app. It allows users to search profiles, articles by topic, post articles, comment on articles, up/down vote articles and comments, and delete comments. 

### Prerequisites
This project has been built by and runs in NODE. The further dependencies can be installed by running NPM INSTALL in the command line. The additional packages are: Express, Body-Parser and Mongoose. The test suite uses Chai, Mocha and SuperTest.  

### Getting Started
Start with git. Follow a link to the repository and fork a version to your profile. Then, copy the link, and run the command GIT CLONE followed by the URL. Find the file in visual studio, or a similar dev tool program, and open the file. Next, run the command NPM INSTALL. This will download all relevant dependencies. But, it will not include dev dependencies to run tests. So, install the following: chai, mocha, Supertest, and Nodemon. 

In short:
1.	GIT CLONE <URL> 
2.	NPM INSTALL 
3.	NPM I CHAI MOCHA SUPERTEST 

There will be no configuration file. This is important. It will set the database URL. So we will need make one. Start by creating a new file and calling it CONFIG.JS. Then set a NODE_ENV to the following:

 ``` const NODE_ENV = process.env.NODE_ENV || test ```

Then create an object called CONFIG and copy the following key property values: 

```const config = {
  test: {
    DB_URL: "mongodb://localhost:27017/northcodersTestNewsDatabase",
    database: "../seed/testData/index"
  },
 }

module.exports = config[NODE_ENV]; 
```

Finally, run NPM RUN SEED DEV to seed the development into the Mongo database. 

### Testing 
To run tests run NPM TEST.  The test data is much smaller than the production data – lest there are any unwanted edits to a live production database. Tests can be run with the command NPM TEST. This command also re-seeds the test database on every command. The tests check all CRUD operations. This includes get, post, patch and delete. It also ensures errors are handled with the correct status codes and messages. 

For example:   

 ```
 describe('GET /api/topics/:topic_slug/articles', () => {
        it('returns a status 200 and all articles for a particular topic', () => {
            return request
                .get(`/api/topics/${articleDocs[0].belongs_to}/articles`)
                .expect(200)
                .then(result => {
                    expect(result.body[0].belongs_to).to.equal(articleDocs[0].belongs_to)
                })
        })
        it('returns a status 404 if a topic does not exist', () => {
            return request
                .get(`/api/topics/tennis/articles`)
                .expect(404)
                .then(result => {
                    expect(result.body.msg).to.equal('Requesting invalid parameter')
                })
        })
   })
   ```

This test ensures all topics for a particular topic are returned successfully. It also ensures an invalid parameter returns the correct status code and error message. 

The project can be deployed live on Heroku: https://dashboard.heroku.com/apps with data stored in MLab: https://mlab.com/. Here is my live deployed version: https://git.heroku.com/kurtisncnews.git

Author: Kurtis Angell – Learning JavaScript at NorthCoders. 

