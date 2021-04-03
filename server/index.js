const path = require('path');
const { app } = require('./app');

const PORT = 3001;

const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});

