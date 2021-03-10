const mongoose = require('mongoose');

/**
 * Database Connection.
 * Process terminates on database connection failure.
 */

mongoose.connect(process.env.database,
    {useUnifiedTopology: true, useNewUrlParser: true},
);

mongoose.set('useFindAndModify', false);

module.exports.databaseconnect;
