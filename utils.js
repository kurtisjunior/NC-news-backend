
// Per feedback 'not needed'



exports.formatTopics = (topicData) => {
    const topics = topicData.map((element) => {
        return {
            title: element.title,
            slug: element.slug
        }
    })
    return topics;
}


exports.formatUsers = (userData) => {
    const users = userData.map((element) => {
        return {
            username: element.username,
            name: element.name,
            avatar_url: element.avatar_url
        }
    })
    return users;
}


function formatUserID(article, users) {
    const name = article.created_by;
    const userId = users.find(element => element.username === name)._id;
    return userId;
}

exports.formatArticles = (articleRawData, users) => {
    const articles = articleRawData.map((article) => {
        return {
            ...article,
            created_by: formatUserID(article, users),
            belongs_to: article.topic
        }
    })
    return articles
}


function commentUserId(comment, users) {
    const name = comment.created_by;
    const userId = users.find(element => element.username === name)._id
    return userId;

}

function belongsToUserId(comment, articles) {
    const belongs = comment.belongs_to;
    const userId = articles.find(element => element.title === belongs)._id
    return userId;
}


exports.formatComments = (commentsRawData, users, articles) => {
    const comments = commentsRawData.map((comment) => {
        return {
            ...comment,
            created_by: commentUserId(comment, users),
            belongs_to: belongsToUserId(comment, articles)
        }
    })
    return comments;
}



