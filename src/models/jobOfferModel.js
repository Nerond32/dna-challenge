const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobOfferModel = new Schema({
  category: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  employerID: { type: String }
});

module.exports = mongoose.model('JobOffer', jobOfferModel);
