/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('users', [
            {
                full_name: 'Ruan Portella',
                email: 'ruanmorales29@gmail.com',
                password: '$2b$10$MqJZiliUM7zVxJL6zNkGfODbD5LnX7f0MQZsXdta0./dPzmdikJPm',
            },
            {
                full_name: 'Ruan Portella',
                email: 'ruanportella.dev@gmail.com',
                password: '$2b$10$MqJZiliUM7zVxJL6zNkGfODbD5LnX7f0MQZsXdta0./dPzmdikJPm',
            },
        ], {});
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('users');
    },
};
