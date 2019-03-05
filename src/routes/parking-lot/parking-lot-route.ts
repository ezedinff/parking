import { BlockController } from '@/controllers/block.controller';
import { FloorController } from '@/controllers/floor.controller';
import { ParkingLotController } from '@/controllers/parking-lot.controller';
import { BaseRoute } from '@/routes/route';

export class ParkingLotRoute extends BaseRoute {
  public static path = '/parking-lots';
  private static instance: ParkingLotRoute;
  private parkingLotController: ParkingLotController;
  private blockController: BlockController;
  private floorController: FloorController;

  private constructor () {
    super();
    this.parkingLotController = new ParkingLotController();
    this.blockController = new BlockController();
    this.floorController = new FloorController();
    this.init();
  }

  static get router () {
    if (!this.instance) {
      ParkingLotRoute.instance = new ParkingLotRoute();
    }
    return ParkingLotRoute.instance.router;
  }

  public init () {
    this.router.get('/', this.parkingLotController.index);
    this.router.post('/', this.parkingLotController.store);
    this.router.get('/:id', this.parkingLotController.show);
    this.router.put('/:id', this.parkingLotController.update);
    this.router.delete('/:id', this.parkingLotController.index);

    this.router.get('/:id/blocks', this.blockController.getBlocks);
    this.router.post('/:id/blocks', this.blockController.addBlock);
    this.router.get('/:id/blocks/:block_id', this.blockController.getBlock);
    this.router.put('/:id/blocks/:block_id', this.blockController.updateBlock);
    this.router.delete('/:id/blocks/:block_id', this.blockController.deleteBlock);

    this.router.get('/:id/blocks/:block_id/floors', this.floorController.getFloors);
    this.router.post('/:id/blocks/:block_id/floors', this.floorController.addFloor);
    this.router.put('/:id/blocks/:block_id/floors/:floor_id', this.floorController.updateFloor);
    this.router.delete('/:id/blocks/:block_id/floors/:floor_id', this.floorController.deleteFloor);
  }
}
