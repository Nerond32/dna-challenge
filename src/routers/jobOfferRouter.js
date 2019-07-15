const express = require('express');
const validate = require('express-validation');
const jobOfferValidator = require('./validators/jobOfferValidator');
const jobOfferController = require('./controllers/jobOfferController');

const jobOfferRouter = JobOffer => {
  const router = express.Router();
  const controller = jobOfferController(JobOffer);
  router
    .route('/jobs')
    .get(controller.getJobOffers)
    .post(validate(jobOfferValidator.newJobOffer), controller.postJobOffer);
  return router;
};

module.exports = jobOfferRouter;
