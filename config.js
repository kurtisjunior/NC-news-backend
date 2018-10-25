//test environment or not (set in the spec test file)
const environment = process.env.NODE_ENV || 'dev'

const data = {
    "dev": './devData/index',
    "test": './testData/index'
}

//export the property value of whatever the environment variable is set to
module.exports = data[environment]





//may need changing to include the DB_URL