/* eslint-disable no-unused-vars */
const app = require('./app');
const port = process.env.port || 3000;

try {
  /**
   * Importing module to connect mongo database.
   */
  const dbconnect = require('./models/databaseconnect');
} catch (err) {
  process.exit(500);
}

try {
  /**
   * Starting server.
   */
  app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
  });
} catch (err) {
  process.exit(500);
};
