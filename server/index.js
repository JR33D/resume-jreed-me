const express = require("express");
const cors = require('cors');

const experienceRoutes = require('./routes/experience-routes.js');
const projectRoutes = require('./routes/project-routes.js');
const skillRoutes = require('./routes/skill-routes.js');

require('dotenv').config({ path: '../.env' })

const PORT = process.env.SERVER_APP_PORT || 3001;

const app = express();
app.use(cors());
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});