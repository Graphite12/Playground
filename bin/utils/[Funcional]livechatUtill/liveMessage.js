import moment from 'moment';

const formatMsgTime = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
  };
};

const liveMessage = {};

class LiveMessage {
  constructor() {}
}
export default formatMsgTime;
