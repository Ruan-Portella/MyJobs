const { Job } = require('../models');

const dateFormatted = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    const newDate = `${dia}/${mes}/${ano}`;
    return newDate;
};

const getAllUserJobs = async (id) => {
    const jobs = await Job.findAll({ where: { userId: id }, attributes: { exclude: ['userId', 'id', 'updatedAt'] } });

    if (jobs.length === 0) return { message: 'No jobs found' };

    jobs.forEach(({ dataValues }) => {
        const newDataValues = dataValues;
        newDataValues.createdAt = dateFormatted(dataValues.createdAt);
    });

    return jobs;
};

const validateJobExist = async (companyName, jobLink) => {
    const job = await Job.findOne({ where: { companyName, jobLink } });
    return job;
};

const createJob = async ({ companyName, jobLink, userId }) => {
    const jobExist = await validateJobExist(companyName, jobLink);
    if (jobExist) return { message: 'Job already exists' };
    const job = await Job.create({ companyName, jobLink, userId });
    return job;
};

module.exports = {
    getAllUserJobs,
    createJob,
};
