const Twit = require('twit'); // eslint-disable-line

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});
const json = require('../package.json');

const message = `Hey there! The new release ${json.version} of ForgJs is available on #github and #npm.
Have fun and code with love ❤
P.S. Im a robot running on @circleci`;

T.post('statuses/update', { status: message }, (err) => {
  if (!err) {
    console.log('Grate job'); // eslint-disable-line
  }
});
