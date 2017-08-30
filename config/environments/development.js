module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    //youtube access token
    'YOUTUBE_ACCESS_TOKEN': process.env.YOUTUBE_ACCESS_TOKEN,
    // Setting port for server
    'port': 3000,
    //Setting port for REDIS
    'REDIS_PORT': 6379,
    //Setting host for REDIS
    'REDIS_HOST': 'localhost' || '127.0.0.1'
  }