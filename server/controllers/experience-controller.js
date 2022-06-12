const experienceJson = require("../data/experiences.json");

const getExperiences = (req, res) => {
    return res.json(experienceJson);
};

module.exports = { getExperiences }