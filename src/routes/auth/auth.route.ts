import { AuthController } from '@/controllers/auth.controller';
import { BaseRoute } from '@/routes/route';
import verifyToken from '../../middlewares/verifytoken';
export class AuthRoute extends BaseRoute {
  public static path = '/auth';
  private static instance: AuthRoute;
  private  authController: AuthController;
  private constructor () {
    super();
    this.authController = new  AuthController();
    this.init();
  }

  static get router () {
    if (!this.instance) {
      AuthRoute.instance = new AuthRoute();
    }
    return AuthRoute.instance.router;
  }

  private init () {
    this.router.post('/sign-up', this.authController.signup);
    this.router.post('/sign-in', this.authController.signin);
    this.router.get('/users', verifyToken, this.authController.getUsers);
    this.router.get('/me', verifyToken, this.authController.me);
  }
}
