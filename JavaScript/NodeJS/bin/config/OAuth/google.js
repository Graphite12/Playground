import { google } from 'googleapis';
import { google_config as gc } from '../dotenv/dotenv_config.js';

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

const authorizedURL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

export { authorizedURL, oauth2Client, oauth2 };
