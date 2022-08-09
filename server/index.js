const express = require('express');
const app = express();
const path = require('path');
const PORT = 3200;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));