const skillJson = require("../data/skills.json");

const getSkills = (req, res) => {
    return res.json(skillJson);
};

module.exports = { getSkills }