module.exports = {  
    // Secret key for JWT signing and encryption
    'SECRET': 'super secret passphrase',
    //youtube access token
    'YOUTUBE_ACCESS_TOKEN': process.env.YOUTUBE_ACCESS_TOKEN,
    // Setting port for server
    'PORT': process.env.PORT || 3000,
    //Setting port for REDIS
    'REDIS_PORT': process.env.REDIS_PORT || 6379,
    //Setting host for REDIS
    'REDIS_HOST': process.env.REDIS_HOST || '127.0.0.1'
  }