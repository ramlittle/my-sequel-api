'use strict';
const { DataTypes } = require('@sequelize/core');
module.exports.ActivityModel = (sequelize) => {
    return sequelize.define(
        'Activity',
        {
            activity_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            activity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            employee_id:{
                type:DataTypes.BIGINT,
                allowNull:false,
            }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            modelName: 'Activity',
            freezeTableName: true,
            paranoid: true,//this will allow you to restore deleted data
            collate: 'latin1_swedish_ci',
        }
    );
    //   FOR FOREIGN KEY SETUP
    // Activity.associate = (models) => {
    //   Activity.hasMany(models.Employees, { foreignKey: 'employee_id' });
    // };

};

