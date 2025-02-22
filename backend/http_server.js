const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dashboardRoute = require('./routes/dashboardRoute');
const authRoute = require('./routes/authRoute');
const userAuthRoute = require('./routes/userAuthRoute');
const formRoutes = require("./routes/formRoute");
const clientRoutes = require("./routes/clientRoute");
const teamRoutes = require('./routes/teamsRoute');
const serviceRoutes = require("./routes/serviceRoute");
const blogRoutes = require('./routes/blogRoutes');
const adminBlogRoutes = require('./routes/adminBlogRoutes');
const portfolioRoute = require('./routes/portfolioRoute');
const userRoutes = require('./routes/userDashboardRoute');
const teamActivityRoute = require('./routes/teamActivityRoute');
const teamActivityAdminRoute = require('./routes/teamActivityAdminRoute');
const cors = require('cors');

dotenv.config();
const app = express();

// DATABASE CONNECTION
connectDB();

// CORS Setup
app.use(cors());
app.use(express.json());

// HTTP Server Setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running fine on http://localhost:${port}`);
});

// Routes
app.use('/api', authRoute);
app.use('/api', dashboardRoute);
app.use('/api', userAuthRoute);
app.use("/api", clientRoutes);
app.use("/api/form", formRoutes);
app.use('/api/teams', teamRoutes);
app.use("/api", serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/portfolio', portfolioRoute);
app.use('/api/user', userRoutes);
app.use('/api/projects', teamActivityRoute);
app.use('/api/admin', teamActivityAdminRoute);