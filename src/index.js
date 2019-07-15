const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel');
const JobOffer = require('./models/jobOfferModel');
const userRouter = require('./routers/userRouter')(User);
const jobOfferRouter = require('./routers/jobOfferRouter')(JobOffer);

mongoose.connect('mongodb://localhost/usersAPI', { useNewUrlParser: true });
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRouter);
app.use('/api', jobOfferRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
