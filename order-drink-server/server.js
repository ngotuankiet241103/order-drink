const express = require('express');
const cors = require('cors');
const app = express();
const storeController = require('./controller/StoreController');

// Use CORS middleware to allow all origins
app.use(cors());

app.use(express.json());
app.use('/api', storeController);

const server = app.listen(3000, () => {
    console.log("Server is running on port", server.address().port);
});