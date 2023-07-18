/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            googleId: {
                type: Sequelize.STRING,
                field: 'google_id',
                allowNull: true,
            },
            fullName: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'full_name',
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};
