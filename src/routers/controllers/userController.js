const bcrypt = require('bcrypt');

const userController = User => {
  const postUser = (req, res) => {
    if (req.body.creationDate) {
      delete req.body.creationDate;
    }
    const query = { login: req.body.login };
    User.find(query, (err, existingUsers) => {
      if (err) {
        return res.send(err);
      }
      if (!existingUsers.length) {
        req.body.password = bcrypt.hashSync(req.body.password, 12);
        const user = new User(req.body);
        user.creationDate = Date.now();
        user.save();
        const response = { login: user.login, creationDate: user.creationDate };
        return res.status(201).json(response);
      }
      return res.status(409).json({
        message: 'Cannot create user, user with this login already exists'
      });
    });
  };

  const findUser = (req, res, next) => {
    const query = { login: req.params.login };
    User.find(query, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user.length) {
        [req.user] = user;
        return next();
      }
      return res.sendStatus(404);
    });
  };
  const getUser = (req, res) => {
    const response = {
      login: req.user.login,
      creationDate: req.user.creationDate
    };
    return res.json(response);
  };
  const patchUser = (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    if (req.body.creationDate) {
      delete req.body.creationDate;
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
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
      const response = {
        login: req.user.login,
        creationDate: req.user.creationDate
      };
      return res.json(response);
    });
  };
  const deleteUser = (req, res) => {
    req.user.remove(err => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  };
  return { postUser, findUser, getUser, patchUser, deleteUser };
};

module.exports = userController;
