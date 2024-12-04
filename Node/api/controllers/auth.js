import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import config from '../../config.js';

export const singup = async (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists'
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hash
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: 'User created',
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

export const singin = async (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.jwtKey,
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};