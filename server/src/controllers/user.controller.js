const userService = require('../services/user.service');

const getAllUserJobs = async (req, res) => {
    const { id } = req.user;
    const jobs = await userService.getAllUserJobs(id);
    if (jobs.message) return res.status(404).json(jobs);
    return res.status(200).json(jobs);
};

module.exports = {
    getAllUserJobs,
};
