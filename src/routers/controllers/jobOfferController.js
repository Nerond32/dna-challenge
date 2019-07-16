const User = require('../../models/userModel');

const jobOfferController = JobOffer => {
  const getJobOffers = (req, res) => {
    const { query } = req;
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.employerLogin) {
      query.login = req.query.employerLogin;
    }
    JobOffer.find(query, (err, offers) => {
      if (err) {
        return res.send(err);
      }
      return res.json(offers);
    });
  };
  // eslint-disable-next-line consistent-return
  const postJobOffer = (req, res) => {
    const jobOffer = new JobOffer(req.body);
    if (
      jobOffer.startDate < Date.now() ||
      jobOffer.startDate >= jobOffer.endDate
    ) {
      return res
        .status(400)
        .json('Starting date cannot be set in the past or  after the end date');
    }
    const query = { login: req.body.employerLogin };
    User.find(query, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (!user.length) {
        return res.status(400).json({
          message: 'User with this login does not exist'
        });
      }
      jobOffer.save();
      return res.status(201).json(jobOffer);
    });
  };

  return { getJobOffers, postJobOffer };
};

module.exports = jobOfferController;
