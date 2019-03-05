import { Customer, User } from '@/models';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  public signup (req: Request, res: Response) {
    const customerdata = {
      contact_number: req.body.contact_number,
      vehicle_number: req.body.vehicle_number,
    };
    new Customer(customerdata).save((err, customer) => {
      if (err) {
        res.send(err);
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const userdata = {
        fullName: req.body.fullName,
        password: hashedPassword,
        user_id: customer._id,
        username: req.body.contact_number,
      };
      if (customer) {
        new User(userdata).save((er, user) => {
          if (er ) {res.send(er); }
          const token = jwt.sign({id: user._id}, 'fikiryashenfal', {
            expiresIn: 86400,
          });
          user.password = undefined;
          res.send({auth: true, token, user});
        });
      }
    });
  }

  public signin (req: Request, res: Response) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) { return res.status(500).send('Error on the server.'); }
      if (!user) { return res.status(404).send('No user found.'); }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) { return res.status(401).send({auth: false, token: undefined}); }
      const token = jwt.sign({ id: user._id }, 'fikiryashenfal', {
        expiresIn: 86400, // expires in 24 hours
      });
      res.send({ auth: true, token });
    });
  }
  public getUsers (req: Request, res: Response) {
    User.find({}, (err, users) => {
      if (err) { res.send(err); }
      res.send(users);
    });
  }

  public me (req: Request, res: Response) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, 'fikiryashenfal', (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      res.status(200).send({auth: true, user: decoded});
    });
  }
}
