const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const userController = require('./userController');
const User = require('../../models/userModel');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true }, err => {
    if (err) throw err;
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('User Controller:', () => {
  const controller = userController(User);
  describe('postUser', () => {
    const req = {
      body: {
        login: 'johnny',
        password: 'W#Q%BV^Azt'
      }
    };
    it('should return 201 response with the same login', done => {
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(response => {
            expect(res.status).toHaveBeenCalledWith(201);
            expect(response.login).toEqual(req.body.login);
            done();
          })
        })),
        send: jest.fn()
      };
      controller.postUser(req, res);
    });
    it('should return 409 and not allow creating user with login already present in DB', done => {
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(() => {
            expect(res.status).toHaveBeenCalledWith(409);
            done();
          })
        })),
        send: jest.fn()
      };
      controller.postUser(req, res);
    });
  });
  describe('findUser', () => {
    it('should return 404 for getting non existing user', done => {
      const req = {
        params: {
          login: 'albert666'
        }
      };
      const res = {
        status: jest.fn(),
        send: jest.fn(),
        sendStatus: jest.fn(status => {
          expect(status).toEqual(404);
          done();
        })
      };
      controller.findUser(req, res);
    });
  });
  describe('getUser', () => {
    it('should return 200 with existing user object for existing user', done => {
      const req = {
        user: {
          login: 'johnny'
        }
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(response => {
            expect(res.status).toHaveBeenCalledWith(200);
            expect(response.login).toEqual(req.user.login);
            done();
          })
        }))
      };
      controller.getUser(req, res);
    });
  });
  describe('patchUser', () => {
    it('should return 200 and users object with updated login, when new login is provided', done => {
      const req = {
        body: {},
        params: {
          newLogin: 'betterjohnny'
        },
        user: {
          login: 'johnny'
        }
      };
      const res = {
        status: jest.fn(() => ({
          json: jest.fn(response => {
            expect(res.status).toHaveBeenCalledWith(200);
            expect(response.login).toEqual(req.params.newLogin);
            done();
          })
        }))
      };
      controller.patchUser(req, res);
    });
  });
  describe('deleteUser', () => {
    it('should return 204 after deleting user', done => {
      const req = {
        user: {
          login: 'johnny',
          remove: cb => {
            cb();
          }
        }
      };
      const res = {
        sendStatus: jest.fn(status => {
          expect(status).toEqual(204);
          done();
        })
      };
      controller.deleteUser(req, res);
    });
  });
});
