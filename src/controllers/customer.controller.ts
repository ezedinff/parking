import { Customer } from '@/models';
import { Request, Response } from 'express';

export class CustomerController {
    public index (req: Request, res: Response) {
        Customer.find({}, (err, customers) => {
            if (err) {
                res.send(err);
            }
            res.send(customers);
        });
    }
    public store (req: Request, res: Response) {
        new Customer(req.body).save((err, customer) => {
            if (err) { res.send(err); }
            res.send(customer);
        });
    }
    public show (req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            res.send(customer);
        });
    }
    public update (req: Request, res: Response) {
        Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, customer) => {
            if (err) {
                res.send(err);
            }
            res.send(customer);
        });
    }
    public delete (req: Request, res: Response) {
        Customer.remove({ _id: req.params.contactId }, (err, customer) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted parkinglot!'});
        });
    }
}
