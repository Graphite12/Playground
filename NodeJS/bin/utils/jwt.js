export default {
  isEmailValid: (email) => {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let valid = emailRegexp.test(email);
    let nameParts = email.split('@');
    let domainParts = nameParts[1].split('.');

    if (!email) return false;
    if (email.length > 254) return false;
    if (!valid) return false;
    if (nameParts[0].length > 64) return false;
    if (
      domainParts.some((part) => {
        return part.length > 63;
      })
    ) {
      return false;
    }
    return true;
  },
  isPasswordValid: (password) => {},
};
