const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', require('./users/users'));
app.use('/organizations', require('./api/organizations'));

app.listen(8000, function() {
    console.log('Server listening on port 8000')
});