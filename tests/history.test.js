/* eslint-disable no-unused-vars */
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

beforeAll((done) => {
  const dbconnect = require('../models/testdatabaseconnect');
  done();
});

let token;
let token2;

describe('Post login admin user', () => {
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
});
describe('Post login user', () => {
  it('200 on successful login', () => {
    return request.post('/user/login')
        .send({
          'email': 'rahulsinha@indusos.com',
          'password': '1234@qwerty',
        })
        .then((response)=>{
          token2 = response.body.data;
          expect(response.statusCode).toBe(200);
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
  it('404 on Not found error', () => {
    return request.get('/history/amountspent')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': 'ut44hindiasinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
        });
  });
  it('403 on Access denial error', () => {
    return request.get('/history/amountspent')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          'email': 'utkarshsinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
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

// describe('Rent books to a user', () => {
//   it('200 on successful renting', () => {
//     ;
//   });
// });

// describe('Return books', () => {
//   it('200 on successful return', () => {
//     ;
//   });
// });
