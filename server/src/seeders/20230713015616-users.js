/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('users', [
            {
                full_name: 'Ruan Portella',
                email: 'ruanmorales29@gmail.com',
                password: 'dasidnasudausn',
            },
            {
                full_name: 'Ruan Portella',
                email: 'ruanportella.dev@gmail.com',
                password: 'dasidnasudausn',
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('users');
    },
};
