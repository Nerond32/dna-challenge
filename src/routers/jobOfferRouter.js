const express = require('express');
const User = require('../models/userModel');

const allowedCategories = [
  'IT',
  'Food & Drinks',
  'Office',
  'Courier',
  'Shop assistant'
];

const jobOfferRouter = JobOffer => {
  const router = express.Router();
  router
    .route('/jobs')
    .get((req, res) => {
      const { query } = req;
      if (req.query.category) {
        query.category = req.query.category;
      }
      if (req.query.employerID) {
        query.employerID = req.query.employerID;
      }
      JobOffer.find(query, (err, offers) => {
        if (err) {
          return res.send(err);
        }
        return res.json(offers);
      });
    })
    // eslint-disable-next-line consistent-return
    .post((req, res) => {
      const jobOffer = new JobOffer(req.body);
      if (
        !jobOffer.category ||
        !jobOffer.startDate ||
        !jobOffer.endDate ||
        jobOffer.startDate < Date.now() ||
        jobOffer.startDate >= jobOffer.endDate ||
        !allowedCategories.includes(jobOffer.category)
      ) {
        return res.sendStatus(400);
      }
      User.findById(jobOffer.employerID, (err, user) => {
        if (err) {
          return res.send(err);
        }
        if (!user) {
          return res.sendStatus(400);
        }
        jobOffer.save();
        return res.status(201).json(jobOffer);
      });
    });
  return router;
};

module.exports = jobOfferRouter;
