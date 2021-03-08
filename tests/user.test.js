/* eslint-disable no-unused-vars */
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

let token;
beforeAll((done) => {
  const dbconnect = require('../models/testdatabaseconnect');
  done();
});

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

  it('401 on Credential error', () => {
    return request.post('/user/login')
        .send({
          'email': 'utkarshsinha@indusos.com',
          'password': '1234@qwertyyy',
        })
        .then((response)=>{
          expect(response.statusCode).toBe(401);
        });
  });

  it('404 on Not found error', () => {
    return request.post('/user/login')
        .send({
          'email': 'utksarhs@dasd.com',
          'password': '342q14dsa@3hh',
        })
        .then((response)=>{
          expect(response.statusCode).toBe(404);
        });
  });
});

describe('GET all users', () => {
  it('200 on successful retrieval', () => {
    return request.get('/user/all')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });

  it('500 on invalid token, Authentication error', () => {
    return request.get('/user/all')
        .set('Authorization', `Bearer y${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });

  it('400 on missing token, Authentication error', () => {
    return request.get('/user/all')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
});

describe('Post Register new user', () => {
  // it('200 on successful registration', () => {
  //   return request.post('/user/register')
  //       .send({
  //         'name': 'Prafull Sinha',
  //         'email': 'prafullsinha@indusos.com',
  //         'password': '1234@qwerty',
  //         'dob': '1991-06-24',
  //       })
  //       .then((response)=>{
  //         expect(response.statusCode).toBe(200);
  //       });
  // });
  it('409 on Duplication error', () => {
    return request.post('/user/register')
        .send({
          'name': 'Prafull Sinha',
          'email': 'prafullsinha@indusos.com',
          'password': '1234@qwerty',
          'dob': '1991-06-24',
        })
        .then((response)=>{
          expect(response.statusCode).toBe(409);
        });
  });
  it('500 on Validation error', () => {
    return request.post('/user/register')
        .send({
          'tame': 'Prafull Sinha',
          'mail': 'prafullsinha@indusos.com',
          'password': '1234@qwerty',
          'dob': '1991-06-24',
        })
        .then((response)=>{
          expect(response.statusCode).toBe(500);
        });
  });
});
