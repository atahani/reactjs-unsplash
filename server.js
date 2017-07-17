const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3030;

const app = express();

// serve static assets
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// handle all of the request to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});