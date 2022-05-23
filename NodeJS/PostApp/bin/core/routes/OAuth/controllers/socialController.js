import {
  generateRedirctURL,
  generateCode,
  getTokenFromUserData,
  oauth2Client,
  oauth2,
} from '../../../../config/OAuth/google.js';

export default {
  getSocialLogin: async (req, res, next) => {
    console.log(req.params.social);
    console.log(req.url);

    let url = req.params.social;

    switch (url) {
      case 'google':
        let url = await generateRedirctURL();
        console.log(url, JSON.stringify(url.split('=')));

        res.status(302).redirect(url);
        break;

      case 'kakao':
        res.status(302).redirect(authorizedURL);
        break;

      default:
        res.status(400).json('소셜로그인 실패');
        break;
    }
  },

  getSocialCallback: async (req, res, next) => {
    try {
      let code = await generateCode(req.url);
      console.log('code:', code);

      let { tokens, config, data } = await getTokenFromUserData(code);
      console.log(tokens);

      let acctkn = tokens.access_token;

      req.session['token'] = acctkn;

      console.log(req.session);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};
