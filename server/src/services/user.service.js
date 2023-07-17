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

const validateJobExist = async (jobLink, userId) => {
    const job = await Job.findOne({ where: { jobLink, userId } });
    return job;
};

const createJob = async ({ companyName, jobLink, userId }) => {
    const jobExist = await validateJobExist(jobLink, userId);
    if (jobExist) return { message: 'Job already exists' };
    const job = await Job.create({ companyName, jobLink, userId });
    return job;
};

const updateJob = async ({
    newCompanyName, jobLink, newJobLink, newJobStatus, userId,
}) => {
    const jobExist = await validateJobExist(jobLink, userId);
    const jobExistNewLink = await validateJobExist(newJobLink, userId);

    if (!jobExist) return { message: 'Job does not exist' };

    if (jobExistNewLink) return { message: 'Job already exists' };

    const verifyJob = newJobLink || jobLink;

    const job = await Job.update(
        {
            companyName: newCompanyName,
            jobStatus: newJobStatus,
            jobLink: verifyJob,
        },
        { where: { jobLink, userId } },
    );

    if (job[0] === 0) return { message: 'Failed to update job' };

    return job;
};

const deleteJob = async (jobLink, userId) => {
    const jobExist = await validateJobExist(jobLink, userId);

    if (!jobExist) return { message: 'Job does not exist' };

    const job = await Job.destroy({ where: { jobLink, userId } });

    if (job === 0) return { message: 'Failed to delete job' };

    return job;
};

module.exports = {
    getAllUserJobs,
    createJob,
    updateJob,
    deleteJob,
};
