/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('jobs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            companyName: {
                allowNull: false,
                field: 'company_name',
                type: Sequelize.STRING,
            },
            jobLink: {
                allowNull: false,
                field: 'job_link',
                unique: true,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                field: 'updated_at',
                type: Sequelize.DATE,
            },
            userId: {
                allowNull: false,
                field: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('jobs');
    },
};
