import { CustomerController } from '@/controllers/customer.controller';
import { RegularPassController } from '@/controllers/regular-pass.controller';
import { BaseRoute } from '@/routes/route';

export  class CustomerRoute extends BaseRoute {
  public static path = '/customers';
  private static instance: CustomerRoute;
  private customerController: CustomerController;
  private regularPassController: RegularPassController;
  private constructor () {
    super();
    this.customerController = new CustomerController();
    this.regularPassController = new RegularPassController();
    this.init();
  }
  static get router () {
    if (!CustomerRoute.instance) {
      CustomerRoute.instance = new CustomerRoute();
    }
    return CustomerRoute.instance.router;
  }
  private init () {
    this.router.get('/', this.customerController.index);
    this.router.post('/', this.customerController.store);
    this.router.get('/:id', this.customerController.show);
    this.router.put('/:id', this.customerController.update);
    this.router.delete('/:id', this.customerController.delete);

    this.router.get('/:id/regular-pass', this.regularPassController.getRegularPasses);
    this.router.post('/:id/regular-pass', this.regularPassController.addRegularPass);
    this.router.get('/:id/regular-pass/:regular_pass_id', this.regularPassController.getRegularPass);
    this.router.put('/:id/regular-pass/:regular_pass_id', this.regularPassController.updateRegularPass);
    this.router.delete('/:id/regular-pass/:regular_pass_id', this.regularPassController.deleteRegularPass);
  }

}
