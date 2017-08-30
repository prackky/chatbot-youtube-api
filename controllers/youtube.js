module.exports = require("../lib/youtube").Youtube;
const redis = require('redis');
const config = require('../config/environments/production');
const REDIS_PORT = config.REDIS_PORT;
const REDIS_HOST = config.REDIS_HOST;
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

const YoutubeAPI = require(__dirname + '/youtube');
const YOUTUBE_ACCESS_TOKEN = config.YOUTUBE_ACCESS_TOKEN; // declare your YOUTUBE_ACCESS_TOKEN in heroku environment variable
// under settings

const api = new YoutubeAPI(YOUTUBE_ACCESS_TOKEN);

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('connect', function () {
    console.log('Connected to Redis');
});

const imageUrl = "https://s19.postimg.org/y6pd8dn4j/No_image_available.png";
const youtubeURL = "https://www.youtube.com/watch?v=";

module.exports = {
    youtubeController: function (request, response) {
        //console.log(request);
        if (request.query.q) {
            try {
                let options = {
                    search: request.query.q, // user query received in request
                    part: "snippet",
                    order: request.query.order || "relevance", // if user provides order set the value else set as viewcount
                    type: request.query.type || "video",
                    videoDefinition: request.query.videoDefinition || "any",
                    videoType: "any",
                    maxResults: request.query.maxResults || 5
                };
                //*********************function to search the video on youtube - START ***************************
                api.getVideoSearch(options, (err, res) => {
                    if (err) {
                        //console.log("error received in search API...")
                    } else {
                        let videoData = JSON.parse(res.body) || {};
                        //console.log(videoData); //comment this console log
                        loopVideos(videoData, (elementsData) => {
                            //facebook messenger gallery template...
                            let messageData = [{
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "generic",
                                        "elements": elementsData
                                    }
                                }
                            }];
                            if (elementsData) {
                                //set redis query to cache
                                client.setex(request.query.q, 7200, JSON.stringify(messageData));
                                response.send(messageData);
                                //console.log("messageData = " + JSON.stringify(messageData)); //comment this console log
                            } else {
                                response.send([{
                                    "text": "Sorry, video service is not available right now..."
                                }]);
                            }
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
            //*********************function to search the video on youtube - END ***************************
        } else {
            response.send(messageData || [{
                "text": "Please send the search query for video search..."
            }]);
        }
    },
    youtubeCache: function (req, res, next) {
        const query = req.query.q;
        client.get(query, function (err, data) {
            if (err) throw err;
            if (data != null) {
                res.send(data);
                console.log("REDIS just replied to query: " + query);
            } else {
                next();
            }
        });
    }
}

//******************* loop through all the data received from youtube API and convert to Facebook gallery format -  START ***********************
var loopVideos = function (videoData, done) {
    let elementsData = []; // elementsData is the JSON format array containing cards
    try {
        for (var i = 0; i < videoData.pageInfo.resultsPerPage; i++) {
            elementsData[i] = {
                "title": videoData.items[i].snippet.title,
                "image_url": videoData.items[i].snippet.thumbnails.high.url || imageUrl,
                "subtitle": videoData.items[i].snippet.description,
                "buttons": [{
                    "type": "web_url",
                    "url": youtubeURL + videoData.items[i].id.videoId,
                    "title": "Watch Youtube Video"
                }]
            }
        }
    } catch (err) {
        console.log(err); //comment this console log
    }
    //console.log("elementsData = " + elementsData); //comment this console log
    return done(elementsData);
}
//******************* loop through all the data received from youtube API and convert to Facebook gallery format -  START ***********************