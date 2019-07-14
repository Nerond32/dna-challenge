const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel');

mongoose.connect('mongodb://localhost/usersAPI');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const userRouter = express.Router();
userRouter
  .route('/users')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  })
  .post((req, res) => {
    const user = new User(req.body);
    user.save();
    return res.status(201).json(user);
  });

app.use('/api', userRouter);
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
