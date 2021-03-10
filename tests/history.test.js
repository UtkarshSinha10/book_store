/* eslint-disable no-unused-vars */
const app = require('../app');
const supertest = require('supertest');
const {post} = require('../app');
const request = supertest(app);
const dbconnect = require('../models/testdatabaseconnect');

let token;
let token2;

describe('Post login user', () => {
  it('200 on successful login', () => {
    return request.post('/user/login')
        .send({
          'email': 'utkarshsinha@indusos.com',
          'password': '1234@qwerty',
        })
        .then((response) => {
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
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
  });

  it('404 on Not found error', () => {
    return request.post('/user/login')
        .send({
          'email': 'utksarhs@dasd.com',
          'password': '342q14dsa@3hh',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
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
        .then((response) => {
          token2 = response.body.data;
          expect(response.statusCode).toBe(200);
        });
  });

  it('401 on Credential error', () => {
    return request.post('/user/login')
        .send({
          'email': 'rahulsinha@indusos.com',
          'password': '1234@qwertyyy',
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
  });

  it('404 on Not found error', () => {
    return request.post('/user/login')
        .send({
          'email': 'utksarhs@dasd.com',
          'password': '342q14dsa@3hh',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
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
  it('500 on invalid token, Authentication error', () => {
    return request.get('/history/amountspent')
        .set('Authorization', `Bearer y${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(500);
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
  it('500 on invalid token, Authentication error', () => {
    return request.get('/history/rentedbooks')
        .set('Authorization', `Bearer yknknl.${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
});

describe('Get all books rented to a user currently', () => {
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
  it('500 on Validation error', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'mail': 'vkhvk5indusoscom',
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('404 on user Not found error', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'email': 'vkhvk5@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
        });
  });
  it('403 on Access denial error', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          'email': 'utkarshsinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
        });
  });
  it('500 on invalid token, Authentication error', () => {
    return request.get('/history/bookstouser')
        .set('Authorization', `Bearer y${token}`)
        .send({
          'email': 'utkarshsinha@indusos.com',
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
});

describe('Rent books to a user', () => {
  it('500 on Validation failure', () => {
    return request.post('/history/rentbooks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book': [
            {'id': '13434523423234'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('500 on Invalid token, Authorization failure', () => {
    return request.post('/history/rentbooks')
        .set('Authorization', `Bearer fds.sd${token}`)
        .send({
          'book': [
            {'book_id': '13434523423234'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('200 on successful rent', () => {
    return request.post('/history/rentbooks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book': [
            {'book_id': '603c95e11a9c7c0e78a0abe7'},
          ],
        })
        .then((response) => {
        // console.log(response);
          expect(response.statusCode).toBe(200);
        });
  });
});

describe('Return books', () => {
  it('500 on Invalid token, Authorization failure', () => {
    return request.put('/history/returnbooks')
        .set('Authorization', `Bearer f65${token}`)
        .send({
          'book': [
            {'book_id': '13434523423234'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('500 on Validation failure', () => {
    return request.put('/history/returnbooks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book_id': [
            {'book': '13434523423234'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
});
