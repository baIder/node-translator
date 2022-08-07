import * as https from 'https';
import md5 = require('md5');
import {appid, appSecret} from './private';

export const translate = (word: string) => {
  const salt = Math.random().toString();
  const sign = md5(appid + word + salt + appSecret);
  let from = 'en';
  let to = 'zh';

  if (!(/[a-zA-Z]/.test(word[0]))) {
    from = 'zh';
    to = 'en';
  }

  const params = new URLSearchParams({
    q: word,
    from,
    to,
    appid,
    salt,
    sign,
  });

  const query = params.toString();

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const request = https.request(options, (response) => {
    let chunks: Buffer[] = [];
    response.on('data', (chunk) => {
      chunks.push(chunk);
    });
    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      type BaiduResult = {
        from: string,
        to: string,
        trans_result: {
          src: string,
          dst: string,
        }[],
        error_code?: string,
        error_msg?: string,
      }
      const object: BaiduResult = JSON.parse(string);
      if (object.error_code) {
        console.error(object.error_msg);
        process.exit(2);
      } else {
        console.log(object.trans_result[0].dst);
        process.exit(0);
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();

};


