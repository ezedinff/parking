import {Request, Response} from "express";
import {ParkingSlotReservation} from '../models/parking-slot-reservation';

export class ParkingSlotReservationController {
    public index(req: Request, res: Response) {
        ParkingSlotReservation.find({}, (err, parking_lot_reservations) => {
            if (err) {
                res.send(err);
            }
            res.send(parking_lot_reservations);
        });
    }
    public store(req: Request, res: Response) {
        let parkingLot = new ParkingSlotReservation(req.body);
        parkingLot.save((err, parking_lot_reservation) => {
            if (err) {res.send(err)}
            res.send(parking_lot_reservation)
        });
    }
    public show(req: Request, res: Response) {
        ParkingSlotReservation.findById(req.params.id, (err, parking_lot) => {
            if (err) { res.send(err); }
            res.send(parking_lot);
        });
    }
    public update(req: Request, res: Response) {
        ParkingSlotReservation.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, parking_lot_reservation) => {
            if(err){
                res.send(err);
            }
            res.send(parking_lot_reservation);
        });
    }
    public delete(req: Request, res: Response) {
        ParkingSlotReservation.remove({ _id: req.params.contactId }, (err, parking_lot_reservation) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted reservation!'});
        });
    }
}