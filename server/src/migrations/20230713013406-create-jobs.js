/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Jobs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            jobTitle: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            jobLink: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                field: 'created_at',
                type: Sequelize.DATE,
            },
            userId: {
                allowNull: false,
                field: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Jobs');
    },
};
