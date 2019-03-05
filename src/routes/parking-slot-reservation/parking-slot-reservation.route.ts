import { ParkingSlotReservationController } from '@/controllers/parking-slot-reservation.controller';
import { RegularPassController } from '@/controllers/regular-pass.controller';
import { BaseRoute } from '@/routes/route';

export class ParkingSlotReservationRoute extends BaseRoute {
  public static path = '/parking-slot-reservations';
  private static instance: ParkingSlotReservationRoute;
  private parkingSlotReservationController: ParkingSlotReservationController;
  private regularPassController: RegularPassController;
  private constructor () {
    super();

  }

  static get router () {
    if (!this.instance) {
      ParkingSlotReservationRoute.instance = new ParkingSlotReservationRoute();
    }
    return ParkingSlotReservationRoute.instance.router;
  }
  private init () {
    this.router.get('/', this.parkingSlotReservationController.index);
    this.router.post('/', this.parkingSlotReservationController.store);
    this.router.get('/:id', this.parkingSlotReservationController.show);
    this.router.put('/:id', this.parkingSlotReservationController.update);
    this.router.delete('/:id', this.parkingSlotReservationController.delete);
  }
}
