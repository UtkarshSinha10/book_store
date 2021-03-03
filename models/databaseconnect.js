const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://localhost:27017/assignment', {useUnifiedTopology: true, useNewUrlParser: true}, (error)=>{
    if ( error ) {
      process.exit();
      console.log('Error while connecting db');
    } else {
      console.log('db connected');
    }
  });
} catch (err) {
  process.exit();
}


mongoose.set('useFindAndModify', false);

module.exports.databaseconnect;
