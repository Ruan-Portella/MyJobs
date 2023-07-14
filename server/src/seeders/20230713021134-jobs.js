/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('jobs', [
            {
                company_name: 'Google',
                job_link: 'https://www.google.com',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: 1,
            },
            {
                company_name: 'Ruan Portella',
                job_link: 'https://www.ruanportella.dev',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: 1,
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('jobs');
    },
};
