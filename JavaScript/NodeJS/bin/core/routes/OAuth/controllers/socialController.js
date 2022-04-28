import {
  authorizedURL,
  oauth2Client,
  oauth2,
} from '../../../../config/OAuth/google.js';

import url from 'url';

export default {
  getSocialLogin: async (req, res, next) => {
    console.log(req.params.social);
    console.log(req.url);

    switch (req.params.social) {
      case 'google':
        res.status(302).redirect(authorizedURL);
        break;

      case 'kakao':
        res.status(302).redirect(authorizedURL);
        break;

      default:
        break;
    }
  },

  getSocialCallback: async (req, res, next) => {
    let userCredential = null;
    let userdata = null;
    try {
      console.log(req.url);

      let q = url.parse(req.url, true).query;
      console.log(q);
      let { tokens } = await oauth2Client.getToken(q.code);

      await oauth2Client.setCredentials({ access_token: tokens.access_token });
      userdata = await oauth2.userinfo.get({ auth: oauth2Client });
      // oauth2Client.on('tokens', (tokens) => {
      //   if (tokens.access_token) {
      //   }
      // });ㄴ

      req.session.token = tokens.access_token;
      userCredential = tokens;

      // console.log(req.session);
      console.log(userdata.data);
    } catch (error) {
      console.log(error);
    }
  },
};
