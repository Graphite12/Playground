import { google } from 'googleapis';
import { google_config as gc } from '../dotenv/dotenv_config.js';
import url from 'url';

const oauth2 = google.oauth2('v2');

const oauth2Client = new google.auth.OAuth2(
  gc.clientID,
  gc.clientPWD,
  gc.callback,
);
const scopes = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const option = {
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
};

async function generateRedirctURL() {
  const authorizedURL = await oauth2Client.generateAuthUrl(option);
  return authorizedURL;
}

async function generateCode(query) {
  let { code } = await url.parse(query, true).query;

  return code;
}

async function getTokenFromUserData(code) {
  let { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials({ access_token: tokens.access_token });

  /**
   * 'https://www.googleapis.com/oauth2/v2/userinfo',
   *   headers: {
   *     Authorization: `Bearer ${access_token}`,
   *   }
   * */

  let { config, data } = await oauth2.userinfo.get({ auth: oauth2Client });

  return { tokens, data };
}

export {
  generateRedirctURL,
  generateCode,
  getTokenFromUserData,
  oauth2Client,
  oauth2,
};
