module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        tableName: 'users',
        underscored: true,
        timestamps: false,
    });

    User.associate = (models) => {
        User.hasMany(models.Job, {
            foreignKey: 'userId',
            as: 'jobs',
        });
    };

    return User;
};
