const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const experienceRoutes = require('./routes/experience-routes.js');
const projectRoutes = require('./routes/project-routes.js');
const skillRoutes = require('./routes/skill-routes.js');
const contactRoutes = require('./routes/contact-routes.js');

const PORT = process.env.SERVER_APP_PORT || 3001;

const app = express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config CORS
app.use(cors());

// Setup our Routes defined in other files.
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});