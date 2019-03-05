import { ParkingLot } from '@/models';
import { Request, Response } from 'express';

export class BlockController {
  public getBlocks (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      res.send(parkingLot.blocks);
    });
  }

  public addBlock (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      parkingLot.blocks.push(req.body);
      parkingLot.save(parkingLot);
      res.send(parkingLot.blocks);
    });
  }

  public getBlock (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      res.send(parkingLot.blocks.find((block) => block.id === req.params.block_id));
    });
  }

  public updateBlock (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      Object.assign(parkingLot.blocks.find((block) => block.id === req.params.block_id), req.body);
      parkingLot.save(parkingLot);
      res.send(parkingLot.blocks.find((block) => block.id === req.params.block_id));
    });
  }

  public  deleteBlock (req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parkingLot) => {
      if (err) {
        res.send(err);
      }
      parkingLot.blocks = parkingLot.blocks.filter((block) => block.id !== req.params.block_id);
      parkingLot.save(parkingLot);
      res.json({message: 'Successfully deleted block!'});
    });
  }
}
