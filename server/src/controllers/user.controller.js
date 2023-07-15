const userService = require('../services/user.service');

const getAllUserJobs = async (req, res) => {
    const { id } = req.user;
    const jobs = await userService.getAllUserJobs(id);
    if (jobs.message) return res.status(404).json(jobs);
    return res.status(200).json(jobs);
};

const createJob = async (req, res) => {
    const { companyName, jobLink } = req.body;
    const { id } = req.user;
    const job = await userService.createJob({ companyName, jobLink, userId: id });
    if (job.message) return res.status(409).json(job);
    return res.status(201).json(job);
};

const updateJob = async (req, res) => {
    const {
        newCompanyName, jobLink, newJobLink, newJobStatus,
    } = req.body;
    const { id } = req.user;

    const job = await userService.updateJob({
        newCompanyName, jobLink, newJobLink, newJobStatus, userId: id,
    });
    if (job.message) return res.status(404).json(job);
    return res.status(200).json(job);
};

module.exports = {
    getAllUserJobs,
    createJob,
    updateJob,
};
