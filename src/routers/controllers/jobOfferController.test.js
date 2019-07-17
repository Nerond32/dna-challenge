const jobOfferController = require('./jobOfferController');
const JobOffer = require('../../models/jobOfferModel');
const User = require('../../models/userModel');
const { startMongo, stopMongo } = require('../../testUtils');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

beforeAll(async () => {
  await startMongo();
  const user = new User({
    login: 'wild_andrew69',
    password: '$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe',
    creationDate: 1563316492003
  });
  await user.save();
});

afterAll(async () => {
  await stopMongo();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Job Offer Controller:', () => {
  const controller = jobOfferController(JobOffer);
  describe('postJobOffer', () => {
    it('should return 201 response when provided correct data', done => {
      const req = {
        body: {
          employerLogin: 'wild_andrew69',
          category: 'IT',
          startDate: '2020-05-13T07:32:53.971Z',
          endDate: '2021-05-13T07:32:53.971Z'
        }
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(() => {
            expect(res.status).toHaveBeenCalledWith(201);
            done();
          })
        })),
        send: jest.fn()
      };
      controller.postJobOffer(req, res);
    });
    it('should return 201 response when trying to add the same offer for the second time', done => {
      const req = {
        body: {
          employerLogin: 'wild_andrew69',
          category: 'IT',
          startDate: '2020-05-13T07:32:53.971Z',
          endDate: '2021-05-13T07:32:53.971Z'
        }
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(() => {
            expect(res.status).toHaveBeenCalledWith(201);
            done();
          })
        })),
        send: jest.fn()
      };
      controller.postJobOffer(req, res);
    });
    describe('should return 400 when trying to add job offer', () => {
      it('for non-existing employer(user)', done => {
        const req = {
          body: {
            employerLogin: 'rosemary_h',
            category: 'IT',
            startDate: '2020-05-13T07:32:53.971Z',
            endDate: '2021-05-13T07:32:53.971Z'
          }
        };
        const res = {
          status: jest.fn(() => ({
            json: jest.fn(() => {
              expect(res.status).toHaveBeenCalledWith(400);
              done();
            })
          })),
          send: jest.fn()
        };
        controller.postJobOffer(req, res);
      });
      it('for non-existing category', done => {
        const req = {
          body: {
            employerLogin: 'rosemary_h',
            category: 'Burglary',
            startDate: '2020-05-13T07:32:53.971Z',
            endDate: '2021-05-13T07:32:53.971Z'
          }
        };
        const res = {
          status: jest.fn(() => ({
            json: jest.fn(() => {
              expect(res.status).toHaveBeenCalledWith(400);
              done();
            })
          })),
          send: jest.fn()
        };
        controller.postJobOffer(req, res);
      });
      it('for a date in the past', done => {
        const req = {
          body: {
            employerLogin: 'wild_andrew69',
            category: 'IT',
            startDate: '1990-05-13T07:32:53.971Z',
            endDate: '2021-05-13T07:32:53.971Z'
          }
        };
        const res = {
          status: jest.fn(() => ({
            json: jest.fn(() => {
              expect(res.status).toHaveBeenCalledWith(400);
              done();
            })
          })),
          send: jest.fn()
        };
        controller.postJobOffer(req, res);
      });
      it('with starting date after the ending date', done => {
        const req = {
          body: {
            employerLogin: 'wild_andrew69',
            category: 'IT',
            startDate: '2020-05-13T07:32:53.971Z',
            endDate: '1990-05-13T07:32:53.971Z'
          }
        };
        const res = {
          status: jest.fn(() => ({
            json: jest.fn(() => {
              expect(res.status).toHaveBeenCalledWith(400);
              done();
            })
          })),
          send: jest.fn()
        };
        controller.postJobOffer(req, res);
      });
    });
  });
  describe('getJobOffers', () => {
    it('should return 200 response when trying to get filtered offers and return them', done => {
      const req = {
        query: {
          employerLogin: 'wild_andrew69'
        }
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(response => {
            expect(response[0].employerLogin === req.query.employerLogin);
            expect(res.status).toHaveBeenCalledWith(200);
            done();
          })
        })),
        send: jest.fn()
      };
      controller.getJobOffers(req, res);
    });
    it('should return 404 when requesting offers of non-existing user', done => {
      const req = {
        query: {
          employerLogin: 'goshka'
        }
      };
      const res = {
        sendStatus: jest.fn(status => {
          expect(status).toEqual(404);
          done();
        })
      };
      controller.getJobOffers(req, res);
    });
  });
});
