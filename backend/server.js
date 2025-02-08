const fs = require('fs');
const https = require('https');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dashboardRoute = require('./routes/dashboardRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors');

dotenv.config();
const app = express();

// Load SSL Certificates from Environment Variables
const options = {
   key: fs.readFileSync('/etc/letsencrypt/live/bharatagrawal.shop/privkey.pem'), // Private key

  cert: fs.readFileSync('/etc/letsencrypt/live/bharatagrawal.shop/cert.pem'),    // Certificate

  ca: fs.readFileSync('/etc/letsencrypt/live/bharatagrawal.shop/chain.pem') // Chain file
};

// DATABASE CONNECTION
connectDB();

// CORS Setup
app.use(cors());
app.use(express.json());

// HTTPS Server Setup
https.createServer(options, app).listen(process.env.PORT || 3000, () => {
  console.log(`server is running fine `);
});

// Routes
app.use('/api', authRoute);
app.use('/api', dashboardRoute);
