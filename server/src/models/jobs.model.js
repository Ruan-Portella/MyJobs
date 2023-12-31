module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        companyName: DataTypes.STRING,
        jobLink: { type: DataTypes.STRING, unique: true },
        jobStatus: { type: DataTypes.ENUM('active', 'rejected'), defaultValue: 'active' },
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
