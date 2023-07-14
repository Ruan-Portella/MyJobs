/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // await queryInterface.sequelize.query('ALTER TABLE jobs AUTO_INCREMENT = 1;');
        return queryInterface.bulkInsert('jobs', [
            {
                company_name: 'Google',
                job_link: 'https://www.google.com',
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
