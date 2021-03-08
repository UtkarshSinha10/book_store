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

  it('4xx and 5xx on failure', () => {
    return request.post('/user/login')
        .send({
          'email': 'utkssinha@indusos.com',
          'password': '14@qwerty',
        })
        .then((response)=>{
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
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

  it('4xx and 5xx on failure', () => {
    return request.get('/user/all')
        .set('Authorization', `Bearer y ${token}`)
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(400);
        });
  });
});

// describe('Post Register new user', () => {
//   it('200 on successful login', () => {
//     return request.post('/user/register')
//         .send({
//           'name': 'Prafull Sinha',
//           'email': 'prafullsinha@indusos.com',
//           'password': '1234@qwerty',
//           'dob': '1991-06-24',
//         })
//         .then((response)=>{
//           expect(response.statusCode).toBe(200);
//         });
//   });
// });
