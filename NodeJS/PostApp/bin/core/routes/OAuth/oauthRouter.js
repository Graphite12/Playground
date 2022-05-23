import Router from '../index.js';
import socialCtrl from './controllers/socialController.js';
let socialRouter = Router();

socialRouter
  .get('/:social', socialCtrl.getSocialLogin)
  .get('/:social/callback', socialCtrl.getSocialCallback);

export default socialRouter;
