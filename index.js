const express = require('');
const db = require('');
const routes = require('');

const cwd = process.cwd();

const PORT = process.env.port || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});