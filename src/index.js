const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel');
const JobOffer = require('./models/jobOfferModel');
const userRouter = require('./routers/userRouter')(User);
const jobOfferRouter = require('./routers/jobOfferRouter')(JobOffer);

mongoose.connect('mongodb://localhost/usersAPI', { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/api', userRouter);
app.use('/api', jobOfferRouter);
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
