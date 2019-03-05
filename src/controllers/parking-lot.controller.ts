import { ParkingLot } from '@/models';
import { Request, Response } from "express";

export class ParkingLotController {
  public index(req: Request, res: Response) {
    ParkingLot.find({}, (err, parking_lots) => {
      if (err) {
        res.send(err);
      }
      res.send(parking_lots);
    });
  }

  public store(req: Request, res: Response) {
    const parkingLot = new ParkingLot(req.body);
    parkingLot.save((err, parkinglot) => {
      if (err) {
        res.send(err);
      }
      res.send(parkinglot);
    });
  }

  public show(req: Request, res: Response) {
    ParkingLot.findById(req.params.id, (err, parking_lot) => {
      if (err) {
        res.send(err);
      }
      res.send(parking_lot);
    });
  }

  public update(req: Request, res: Response) {
    ParkingLot.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, parkinglot) => {
      if (err) {
        res.send(err);
      }
      res.send(parkinglot);
    });
  }

  public delete(req: Request, res: Response) {
    ParkingLot.remove({_id: req.params.contactId}, (err, parkinglot) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Successfully deleted parkinglot!'});
    });
  }
}
