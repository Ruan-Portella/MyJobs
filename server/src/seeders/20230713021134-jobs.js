/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query('ALTER TABLE Jobs AUTO_INCREMENT = 1;');
        return queryInterface.bulkInsert('Jobs', [
            {
                jobTitle: 'Software Engineer',
                jobLink: 'https://www.google.com',
                user_id: 1,
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Jobs');
    },
};
