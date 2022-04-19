import bcrtpt from 'bcrypt';

let userData = new Map();

export default {
  isUsername: (uname) => {
    if (!uname) {
      return false;
    }
    return true;
  },
  isPass: (pass) => {
    if (!pass) {
      return false;
    }
    return true;
  },
  isEmail: (mail) => {
    if (!mail) {
      return false;
    }
    return true;
  },
  isEmpty: (data) => {
    userData.set('user', data);
    if (userData.size === 0) {
      return false;
    }
    return true;
  },
  isEmailValid: (email) => {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
  },

  isPasswordCompare: async (pass, word) => {
    let result = await bcrtpt.compareSync(pass, word);
    return result;
  },
};
