import {Request, Response} from "express";
import {Customer} from "../models/customer";

export class RegularPassController {
    public getRegularPasses(req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            res.send(customer['regular_pass']);
        });
    }
    public addRegularPass(req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            customer['regular_pass'].push(req.body);
            customer.save(customer);
            res.send(customer['regular_pass']);
        });
    }
    public getRegularPass(req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            res.send(customer['regular_pass'].find(regular_pass => regular_pass.id === req.params.regular_pass_id));
        });
    }
    public updateRegularPass(req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            Object.assign(customer['regular_pass'].find(regular_pass => regular_pass.id === req.params.regular_pass_id), req.body);
            customer.save(customer);
            res.send(customer['regular_pass'].find(regular_pass => regular_pass.id === req.params.regular_pass_id));
        });
    }
    public deleteRegularPass(req: Request, res: Response) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) { res.send(err); }
            customer['regular_pass'] = customer['regular_pass'].filter(regular_pass => regular_pass.id !== req.params.regular_pass_id);
            customer.save(customer);
            res.json({ message: 'Successfully deleted regular pass!'});
        });
    }
}
