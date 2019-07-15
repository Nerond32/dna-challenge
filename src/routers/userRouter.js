const express = require('express');
const validate = require('express-validation');
const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

const userRouter = User => {
  const router = express.Router();
  const controller = userController(User);
  router
    .route('/users')
    .get(controller.getUsers)
    .post(validate(userValidator.newUser), controller.postUser);
  router.use('/users/:userID', controller.findUser);
  router
    .route('/users/:userID')
    .get(controller.getUser)
    .patch(validate(userValidator.updateUser), controller.patchUser)
    .delete(controller.deleteUser);
  return router;
};

module.exports = userRouter;
