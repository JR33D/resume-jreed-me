const projectsJson = require("../data/projects.json");

const getProjects = (req, res) => {
    return res.json(projectsJson);
};

module.exports = { getProjects }