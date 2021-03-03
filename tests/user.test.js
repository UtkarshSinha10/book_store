// const mongoose = require('mongoose');
// const User = require('../models/model_schema/user');
const request = require('supertest');
const user_routes = require('../routes/user');
// const app = require('../app');
// const express = require('express');
// const jest = require('jest');

// mongoose.connect('mongodb://localhost:27017/test_assignment', {useUnifiedTopology: true, useNewUrlParser: true}, (error)=>{
//   if ( error ) {
//     console.log('Error while connecting db');
//   } else {
//     console.log('db connected');
//   }
// });

describe('Testing user/all api', function() {
  it('users', function(done) {
    // eslint-disable-next-line new-cap
    //  const body = await request(user_routes).get('/all/?skip=0&limit=1');
    // expect(true).toEqual(true);
    request(user_routes).get('/all').expect(200);
  });
});
