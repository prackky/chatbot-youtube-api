[![Known Vulnerabilities](https://snyk.io/test/github/prackky/chatbot-youtube-api/badge.svg)](https://snyk.io/test/github/prackky/chatbot-youtube-api)
# chatbot-youtube-api
API to fetch youtube videos in cards format for facebook messenger.

## One click heroku deploy:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Note: After deploying your app to Heroku, add your YOUTUBE_ACCESS_TOKEN from your Google API account. Also, enable the YOUTUBE API on your Google API account.

This API takes GET request at /videoChannel path along with search parameters which can be as mentioned below:

## 1. q
### TYPE - STRING
The q parameter specifies the query term to search for.
- q=latest music
- q=cardio exercises
- q=capuchin video
        
If you just want to find the relavant videos just provide the "q" parameter with the string. And your URL will be like:
https://your-deployed-url/videoChannel?q=justin+bieber+video
You can also filter your search by providing more parameters mentioned below.
        
## 2. order
### TYPE - STRING
The order parameter specifies the method that will be used to order resources in the API response. The default value is relevance.
### Acceptable values are:
- date – Resources are sorted in reverse chronological order based on the date they were created.
- rating – Resources are sorted from highest to lowest rating.
- relevance – Resources are sorted based on their relevance to the search query. This is the default value for this parameter.
- title – Resources are sorted alphabetically by title.
- videoCount – Channels are sorted in descending order of their number of uploaded videos.
- viewCount – Resources are sorted from highest to lowest number of views. For live broadcasts, videos are sorted by number of concurrent   viewers while the broadcasts are ongoing.
  
## 3. videoDefinition
### TYPE - STRING
The videoDefinition parameter lets you restrict a search to only include either high definition (HD) or standard definition (SD) videos. HD videos are available for playback in at least 720p, though higher resolutions, like 1080p, might also be available. If you specify a value for this parameter, you must also set the type parameter's value to video.

### Acceptable values are:
- any – Return all videos, regardless of their resolution.
- high – Only retrieve HD videos.
- standard – Only retrieve videos in standard definition.
