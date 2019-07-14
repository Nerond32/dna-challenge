const express = require('express');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
