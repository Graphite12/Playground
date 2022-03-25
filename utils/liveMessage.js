import moment from 'moment';

const formatMsgTime = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
  };
};

export default formatMsgTime;
