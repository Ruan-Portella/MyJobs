/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query('ALTER TABLE Jobs AUTO_INCREMENT = 1;');
        return queryInterface.bulkInsert('Jobs', [
            {
                companyName: 'Google',
                jobLink: 'https://www.google.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                user_id: 1,
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Jobs');
    },
};
