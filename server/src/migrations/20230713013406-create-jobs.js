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
                primaryKey: true,
                type: Sequelize.STRING,
            },
            jobStatus: {
                allowNull: false,
                field: 'job_status',
                type: Sequelize.ENUM('active', 'rejected'),
                defaultValue: 'active',
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
                primaryKey: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
            },
        });

        // await queryInterface.addConstraint('jobs', {
        //     fields: ['jobLink', 'userId'],
        //     type: 'primary key',
        //     name: 'jobs_pkey',
        // });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('jobs');
    },
};
