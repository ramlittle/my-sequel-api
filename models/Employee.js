'use strict';
const { DataTypes } = require('@sequelize/core');
module.exports.EmployeeModel = (sequelize) => {
    return sequelize.define(
        'Employee',
        {
            employee_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            modelName: 'Employee',
            freezeTableName: true,
            paranoid: true, //this will allow you to restore deleted data
            collate: 'latin1_swedish_ci',
        }
    );
    //   FOR FOREIGN KEY SETUP
    // Employee.associate = (models) => {
    //   Employee.belongsTo(models.Activity, { foreignKey: 'employee_id' });
    // };

};

