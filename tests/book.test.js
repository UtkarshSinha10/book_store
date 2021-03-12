/* eslint-disable no-unused-vars */
const app = require('../app');
const supertest = require('supertest');
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
describe('Post  login user', () => {
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

describe('Get books by author', () => {
  it('200 on sucessful books retrieval', () => {
    return request.get('/book/author/?author=Utkarsh Sinha')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/author/?author=Utkarsh Sinha')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
  it('200 on sucessful books retrieval', () => {
    return request.get('/book/author/?author=Rashmi Sengar')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});

describe('Get current books', () => {
  it('200 on  successful book retrieval', () => {
    return request.get('/book/currentbook')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/currentbook')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
});

describe('Get earliest date to be rented', () => {
  it('200 on successful date retrieval', () => {
    return request.get('/book/date/?book_id=603c98491a9c7c0e78a0abe8')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/date/?book_id=603c98491a9c7c0e78a0abe8')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
  it('500 Database operation failed', () => {
    return request.get('/book/date/?book_id=603cgcfj98491a9c7c0e78aasdf')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
});

describe('Get books by author name match', () => {
  it('200 on successful book retrieval', () => {
    return request.get('/book/match/?author=Sinha')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/match/?author=Sinha')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
});

describe('Get books by author name', () => {
  it('200 on successful book retrieval', () => {
    return request.get('/book/author/?author=Utkarsh Sinha')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/author/?author=Utkarsh Sinha')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
});

describe('Get books by genre', () => {
  it('200 on successful book retrieval', () => {
    return request.get('/book/genre/?genre=academics')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('400 on missing token, Authentication error', () => {
    return request.get('/book/genre/?genre=academics')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
  it('200 on successful book retrieval', () => {
    return request.get('/book/genre/?genre= ')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});

describe('Post new book', () => {
  it('200 on successful creation', () => {
    return request.post('/book/new')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Tins in war 3'+ Math.random(),
          'price': 2500,
          'published': '1997-01-01',
          'pages': 509,
          'author': 'Stanely Morgan',
          'genre': 'Action',
          'age_rated': 12,
          'copies': 17,
          'description': 'Real heros take sword to save the world',
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
  it('500 on validation error', () => {
    return request.post('/book/new')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'tame': 'Titans in war',
          'price': 2500,
          'published': '1997-01-01',
          'pages': 509,
          'author': 'Stanely Morgan',
          'genre': 'Action',
          'age_rated': 12,
          'copies': 17,
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('409 on  duplication error', () => {
    return request.post('/book/new')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'name': 'Titans in war',
          'price': 2500,
          'published': '1997-01-01',
          'pages': 509,
          'author': 'Stanely Morgan',
          'genre': 'Action',
          'age_rated': 12,
          'copies': 17,
        })
        .then((response) => {
          expect(response.statusCode).toBe(409);
        });
  });
  it('403 on Access denial error', () => {
    return request.post('/book/new')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          'name': 'Titans in war',
          'price': 2500,
          'published': '1997-01-01',
          'pages': 509,
          'author': 'Stanely Morgan',
          'genre': 'Action',
          'age_rated': 12,
          'copies': 17,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
        });
  });
});

describe('Post update book', () => {
  it('500 on validation error', () => {
    return request.post('/book/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'Book_id': '2345342434234',
          'genre': 'Action',
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('403 on Access denial error', () => {
    return request.post('/book/update')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          'book_id': '603c8fc70653842e7089b9c4',
          'copies': 888,
          'genre': 'adventure',
          'price': 1234567,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
        });
  });
  it('500 on Database operation failed', () => {
    return request.post('/book/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book_id': '603c8fc70653842e7qqqq9c4',
          'copies': 888,
          'genre': 'adventure',
          'price': 1234567,
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        });
  });
  it('200 on successful update', () => {
    return request.post('/book/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book_id': '603c8fc70653842e7089b9c4',
          'copies': 888,
          'genre': 'adventure',
          'price': 1234567,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});

describe('Delete reomve book', () => {
  it('403 on Access denial error', () => {
    return request.delete('/book/remove')
        .set('Authorization', `Bearer ${token2}`)
        .send({
          'book': [
            {'book_id': '603c95e11a9c7c0e78a0abe7'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
        });
  });
  it('400 on missing Authentication token', () => {
    return request.delete('/book/remove')
        .send({
          'book': [
            {'book_id': '603c95e11a9c7c0e78a0abe7'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
  });
  it('200 on successful book removal', () => {
    return request.delete('/book/remove')
        .set('Authorization', `Bearer ${token}`)
        .send({
          'book': [
            {'book_id': '604206c44acf6106ec08ff83'},
          ],
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});
