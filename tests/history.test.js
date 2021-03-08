/* eslint-disable no-unused-vars */
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

beforeAll((done) => {
  const dbconnect = require('../models/testdatabaseconnect');
  done();
});

let token;
describe('Post  login user', () => {
  it('200 on successful login', () => {
    return request.post('/user/login')
        .send({
          'email': 'utkarshsinha@indusos.com',
          'password': '1234@qwerty',
        })
        .then((response)=>{
          token = response.body.data;
          expect(response.statusCode).toBe(200);
        });
  });
  it('4xx and 5xx on failure', () => {
    return request.post('/user/login')
        .send({
          'email': 'utkarsnha@indusos.com',
          'password': '124@qwerty',
        })
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
        });
  });
});

describe('Get amount spent by a user in 100 days', () => {
  it('200 on successful retrieval', () => {
    return request.get('/history/amountspent')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': 'utkarshsinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('4xx and 5xx on failure', () => {
    return request.get('/history/amountspent')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': 'utkasinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
        });
  });
});

describe('Get rented books', () => {
  it('200 on successful retrieval', () => {
    return request.get('/history/rentedbooks')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });

  it('4xx and 5xx on failure', () => {
    return request.get('/history/rentedbooks')
        .set('Authorization', `Bearer 55${token}`)
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
        });
  });
});

describe('Get all books rented to a user currently', () =>{
  it('200 on successful retrieval', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': 'utkarshsinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });

  it('4xx and 5xx on failure', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': '@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
        });
  });
});
