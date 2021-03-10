/* eslint-disable no-unused-vars */
const app = require('./app');
const port = process.env.port || 3000;

try {
  /**
   * Importing module to connect mongo database.
   */
  const dbconnect = require('./models/databaseconnect');
} catch (err) {
  console.log('Database connection failed.');
  process.exit(1);
}

try {
  /**
   * Starting server.
   */
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
} catch (err) {
  console.log(`Server cannot start at port ${port}`);
  process.exit(1);
};
