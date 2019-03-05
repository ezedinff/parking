import { ParkingLot } from '@/models';
import { Request, Response } from 'express';

export class FloorController {
  public getFloors (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      res.send(parkingLot.blocks.find((block) => block.id === req.params.block_id).floors);
    });
  }

  public addFloor (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      parkingLot.blocks.find((block) => block.id === req.params.block_id).floors.push(req.body);
      parkingLot.save(parkingLot);
      res.send(parkingLot.blocks.find((block) => block.id === req.params.block_id).floors);
    });
  }

  public getFloor (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      res.send(
        parkingLot.blocks
          .find((block) => block.id === req.params.block_id).floors
          .find((floor) => floor.id === req.params.floor_id),
      );
    });
  }

  public updateFloor (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      Object.assign(
        parkingLot.blocks
          .find((block) => block.id === req.params.block_id).floors
          .find((floor) => floor.id === req.params.floor_id),
        req.body,
      );
      parkingLot.save(parkingLot);
      res.send(
        parkingLot.blocks
          .find((block) => block.id === req.params.block_id).floors
          .find((floor) => floor.id === req.params.floor_id),
      );
    });
  }

  public deleteFloor (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      parkingLot.blocks
        .find((block) => block.id === req.params.block_id).floors
        =
        parkingLot.blocks
          .find((block) => block.id === req.params.block_id).floors
          .filter((floor) => floor.id !== req.params.floor_id);
      parkingLot.save(parkingLot);
      res.json({message: 'Successfully deleted floor!'});
    });
  }
}
