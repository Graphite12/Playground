import passport from 'passport';

export default () => {
  /* 직렬화 (Serialization) */

  /* Info
   *  - 객체를 직렬화 하여 전송 가능한 형태로 만든다.
   *
   *
   */
  passport.serializeUser();

  /* 역직렬화 (Deserialization) */

  /* Info
   *  - 직렬화된 파일 등을 역으로 직렬화 하여 다시 객체의 형태로 만든다.
   *
   *
   */
  passport.deserializeUser();
};
