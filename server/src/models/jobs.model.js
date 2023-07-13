module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        jobTitle: DataTypes.STRING,
        jobLink: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, foreignKey: true },
    }, {
        tableName: 'jobs',
        underscored: true,
        timestamps: true,
    });

    Job.associate = (models) => {
        Job.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Job;
};
