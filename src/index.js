const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel');
const userRouter = require('./routers/userRouter')(User);

mongoose.connect('mongodb://localhost/usersAPI', { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/api', userRouter);
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
