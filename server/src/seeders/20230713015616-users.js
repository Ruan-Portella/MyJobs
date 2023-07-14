/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1;');
        return queryInterface.bulkInsert('users', [
            {
                full_name: 'Ruan Portella',
                email: 'ruanmorales29@gmail.com',
                password: 'dasidnasudausn',
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('users');
    },
};
