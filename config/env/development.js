'use strict';

module.exports = {

    //db: 'mongodb://prorata:prorata1@ds027799.mongolab.com:27799/prorata-prod',
    //db: 'mongodb://prorata:prorata1@ds027819.mongolab.com:27819/prorata-dev',
    db: 'mongodb://prorata:prorata1@localhost:27017/prorata',
    redis: {
      host: 'pub-redis-16767.us-east-1-2.3.ec2.garantiadata.com',
      port: 16767,
      options: { no_ready_check: true }
    },
    debug: true,
    acl: {
      prefix: 'dev'
    },
    app: {
        name: 'ProRata - Revenue Recognition for Subscription-Based Businesses (Development)'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    },
    emailFrom: 'info@prorata.com', // sender address like ABC <abc@example.com>
    mailer: {
        service: 'smtp.mailgun.org',
        auth: {
            user: 'postmaster@app27023445.mailgun.org',
            pass: '6o96rwl4bxj0'
    }
  }
};
