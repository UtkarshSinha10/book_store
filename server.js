const app = require('./app');

const port = process.env.port || 3000;

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
