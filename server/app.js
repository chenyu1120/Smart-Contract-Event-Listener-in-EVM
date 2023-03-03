const express = require('express');
require('dotenv').config();

const { startJob } = require('./task');

const app = express();
const PORT = process.env.PORT || 3000;

startJob();

// Start the express server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
