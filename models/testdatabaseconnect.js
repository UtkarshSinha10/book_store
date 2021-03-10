const mongoose = require('mongoose');

/**
 * Database Connection.
 * Process terminates on database connection failure.
 */

mongoose.connect(process.env.testdatabase,
    {useUnifiedTopology: true, useNewUrlParser: true},
);

mongoose.set('useFindAndModify', false);

module.exports.databaseconnect;
