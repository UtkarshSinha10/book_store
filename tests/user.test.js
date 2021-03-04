/* eslint-disable max-len */
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidXRrYXJzaHNpbmhhQGluZHVzb3MuY29tIiwidXNlcl9pc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNjE0Nzc0Nzc0LCJleHAiOjE2MTQ4MTA3NzR9.IIyS5hbYlr7Q8GS0skq5FZXhlQY77-koZjxsP2LNxmg';

describe('GET all users', () => {
  it('200 on successful retrieval', () => {
    return request.get('/user/all')
        .set('Authorization', `Bearer ${token}`)
        .then( (response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});

// describe('My API tests', function() {
//   let token = null;

//   before(function(done) {
//     request(url)
//         .post('/user/token')
//         .send({_id: user1._id, password: user1.password})
//         .end(function(err, res) {
//           token = res.body.token; // Or something
//           done();
//         });
//   });

//   it('should get a valid token for user: user1', function(done) {
//     request('/get/user')
//         .set('Authorization', 'Bearer ' + token)
//         .expect(200, done);
//   });
// });
