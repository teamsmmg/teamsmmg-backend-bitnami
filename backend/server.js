const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dashboardRoute = require('./routes/dashboardRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();
const app = express();
// DATABASE IS ADDED FROM THE CONFIG FOLDER 
connectDB();

app.use(cors());
app.use(bodyParser.json());

// ADD YOUR ROUTE HERE (DONT;T FORGET TO IMPORT IT )
app.use('/api', authRoute); // Auth routes for signup and login
app.use('/api', dashboardRoute); // Dashboard routes

// remember the port is 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
