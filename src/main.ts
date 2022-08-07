import * as https from 'https';
import md5 = require('md5');

export const translate = (word: string) => {
  console.log(word);
  const appid = '???';
  const appSecret = '???';
  const salt = Math.random().toString();
  const sign = md5(appid + word + salt + appSecret);


  const params = new URLSearchParams({
    q: word,
    from: 'en',
    to: 'zh',
    appid,
    salt,
    sign,
  });

  const query = params.toString();
  console.log(query);

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

};


