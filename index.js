const express = require('express');
const youtube = require("./controllers/youtube");
const config = require("./config/environments/production");
const app = express();
const REST_PORT = config.PORT;

app.use('/', (req, res, next) => {
    console.log("Request received...");
    next();
});

app.get('/videoChannel', youtube.youtubeCache, youtube.youtubeController);

app.listen(REST_PORT, function() {
    console.log('Bot-Server listening on port ' + REST_PORT);
});