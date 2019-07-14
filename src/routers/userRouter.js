const express = require('express');

const userRouter = User => {
  const router = express.Router();
  router
    .route('/users')
    .get((req, res) => {
      const { query } = req;
      if (req.query.login) {
        query.login = req.query.login;
      }
      User.find(query, (err, users) => {
        if (err) {
          return res.send(err);
        }
        return res.json(users);
      });
    })
    .post((req, res) => {
      if (req.body.accCreated) {
        delete req.body.accCreated;
      }
      const user = new User(req.body);
      user.accCreated = Date.now();
      user.save();
      return res.status(201).json(user);
    });
  router.use('/users/:userID', (req, res, next) => {
    User.findById(req.params.userID, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  router
    .route('/users/:userID')
    .get((req, res) => {
      User.findById(req.params.userID, (err, user) => {
        return res.json(user);
      });
    })

    .patch((req, res) => {
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      if (req.body.accCreated) {
        delete req.body.accCreated;
      }
      const { user } = req;
      Object.entries(req.body).forEach(element => {
        const [key, value] = element;
        user[key] = value;
      });
      req.user.save(err => {
        if (err) {
          res.send(err);
        }
        return res.json(req.user);
      });
    })
    .delete((req, res) => {
      req.user.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return router;
};

module.exports = userRouter;
